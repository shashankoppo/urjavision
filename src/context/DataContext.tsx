import React, { createContext, useContext, useEffect, useState } from 'react';
import { solarProducts as initialProducts, solarProjects as initialProjects, pmKusumYojanaSolutions as initialKusum } from '../utils/data';

interface DataContextProps {
  products: any[];
  setProducts: (prod: any[]) => void;
  projects: any[];
  setProjects: (proj: any[]) => void;
  kusumSolutions: any[];
  setKusumSolutions: (sol: any[]) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProductsState] = useState<any[]>(initialProducts);
  const [projects, setProjectsState] = useState<any[]>(initialProjects);
  const [kusumSolutions, setKusumSolutionsState] = useState<any[]>(initialKusum);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch data from SQLite Express Backend
    const fetchData = async () => {
      try {
        const [prodRes, projRes, kusumRes] = await Promise.all([
          fetch('/api/products').catch(() => null),
          fetch('/api/projects').catch(() => null),
          fetch('/api/kusums').catch(() => null),
        ]);

        if (prodRes && prodRes.ok) setProductsState(await prodRes.json());
        if (projRes && projRes.ok) setProjectsState(await projRes.json());
        if (kusumRes && kusumRes.ok) setKusumSolutionsState(await kusumRes.json());
      } catch (err) {
        console.warn("Failed to fetch from DB, falling back to local defaults");
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const setProducts = async (newProducts: any[]) => {
    // If a product is missing from new array, it was deleted
    const deletedProducts = products.filter(p => !newProducts.find(n => n.id === p.id));
    for (const d of deletedProducts) {
       await fetch(`/api/products/${d.id}`, { method: 'DELETE' }).catch(() => null);
    }
    setProductsState(newProducts);
  };

  const setProjects = async (newProjects: any[]) => {
    const deletedProjects = projects.filter(p => !newProjects.find(n => n.id === p.id));
    for (const d of deletedProjects) {
       await fetch(`/api/projects/${d.id}`, { method: 'DELETE' }).catch(() => null);
    }
    setProjectsState(newProjects);
  };

  const setKusumSolutions = async (newKusums: any[]) => {
    const deletedKusums = kusumSolutions.filter(p => !newKusums.find(n => n.id === p.id));
    for (const d of deletedKusums) {
       await fetch(`/api/kusums/${d.id}`, { method: 'DELETE' }).catch(() => null);
    }
    setKusumSolutionsState(newKusums);
  };

  const value = {
    products, setProducts,
    projects, setProjects,
    kusumSolutions, setKusumSolutions
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-pulse flex items-center gap-2"><div className="w-5 h-5 border-2 border-emerald-500 rounded-full border-t-transparent animate-spin"></div> Loading system...</div></div>;

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
