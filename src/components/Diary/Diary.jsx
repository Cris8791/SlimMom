import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Diary.module.css';
import {
  Typography,
  Box,
  List,
  Fab,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';

export default function Diary() {
  const user = useSelector(state => state.auth.user?.data);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [newGrams, setNewGrams] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (user && user.infouser && user.infouser.allowedProductsAll) {
      setProducts(user.infouser.allowedProductsAll);
    }
    setIsLoading(false);
  }, [user]);

  const handleAddProduct = () => {
    if (newProduct && newGrams) {
      const product = products.find(p => p.title === newProduct);
      if (product) {
        setProducts([...products, { ...product, weight: parseInt(newGrams) }]);
        setNewProduct('');
        setNewGrams('');
      }
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Typography>Vă rugăm să vă autentificați pentru a vedea jurnalul.</Typography>;
  }

  return (
    <div className={styles.diary}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          {new Date().toLocaleDateString()}
        </Typography>
        <DateRangeIcon sx={{ ml: 1, color: 'text.secondary' }} />
      </Box>

      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          select
          label="Produs"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          sx={{ mr: 1, minWidth: 200 }}
        >
          {products.map((product) => (
            <MenuItem key={product._id} value={product.title}>
              {product.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Grame"
          type="number"
          value={newGrams}
          onChange={(e) => setNewGrams(e.target.value)}
          sx={{ mr: 1, width: 100 }}
        />
        <Fab color="primary" size="small" onClick={handleAddProduct}>
          <AddIcon />
        </Fab>
      </Box>

      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {products.map((product, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>{product.title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1 }}>{product.weight}g</Typography>
              <Typography sx={{ mr: 1 }}>{product.calories * (product.weight / 100)} kcal</Typography>
              <CloseIcon
                onClick={() => handleRemoveProduct(index)}
                sx={{ cursor: 'pointer', color: 'text.secondary' }}
              />
            </Box>
          </Box>
        ))}
      </List>
    </div>
  );
}
