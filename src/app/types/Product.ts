export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: {
      asset: {
        _id: string;
        url: string;
      };
    };
    slug: {
      current: string;
    };
    dimensions: {
      height: string;
      width: string;
      depth: string;
    };
    features: string[];
    quantity: number;
    category: {
      name: string;
    };
    _createdAt: string;
    _updatedAt: string;
  }