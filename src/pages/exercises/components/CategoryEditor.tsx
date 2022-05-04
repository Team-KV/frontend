import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Box,
  Paper,
  Modal,
} from '@mui/material';
import categoryService from 'api/services/categoryService';
import { useAppDispatch } from 'hooks';
import { Category } from 'models/Category';
import { useTranslation } from 'react-i18next';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, useForm } from 'components/Form';
import { CirclePicker } from 'react-color';
import { Controls } from 'components/Controls';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CategoryEditor = ({
  categories,
  setCategories,
}: {
  categories: Category[];
  setCategories: any;
}) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  const { values, setValues, handleInput } = useForm({
    name: '',
    color: '#333',
  });

  const [open, setOpen] = useState(false);
  const handleOpen = (id?: number) => {
    if (id) setValues({ ...categories.find((category) => category.id === id) });
    else setValues({ name: '', color: '' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deleteCategory = (id: number) => {
    categoryService
      .deleteCategory(id)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });
  };

  const onSubmit = (e: Event) => {
    e.stopPropagation();
    if (values.id) {
      categoryService
        .updateCategory(values.id, values)
        .then((fetchedCategory) => {
          const filteredCategories = categories.filter(
            (category) => category.id !== fetchedCategory.id
          );
          setCategories([...filteredCategories, fetchedCategory]);
        })
        .catch((err) => {
          const message = err.response.data.message;
          dispatch(showError(message));
        });
    } else {
      categoryService
        .addCategory(values)
        .then((fetchedCategory) => {
          setCategories([...categories, fetchedCategory]);
        })
        .catch((err) => {
          const message = err.response.data.message;
          dispatch(showError(message));
        });
    }
    handleClose();
  };

  const handleColorInput = (color: any, event: any) => {
    setValues({ ...values, color: color.hex });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Form onSubmit={onSubmit}>
            <Controls.Input
              name="name"
              label={t('exercises:name')}
              onChange={handleInput}
              value={values.name}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my={5}
            >
              <CirclePicker
                circleSize={30}
                circleSpacing={12}
                onChange={handleColorInput}
                color={{ hex: values.color } as any}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button onClick={handleClose} variant="outlined">
                {t('cancel')}
              </Button>
              <Button variant="contained" type="submit">
                {t('save')}
              </Button>
            </Box>
          </Form>
        </Box>
      </Modal>
      <Paper elevation={3}>
        <Box maxHeight={400} overflow={'auto'}>
          <List>
            {categories?.sort().map((category) => {
              return (
                <ListItem
                  key={category.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        deleteCategory(category.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar
                    className="hover"
                    onClick={() => {
                      handleOpen(category.id);
                    }}
                  >
                    <Avatar sx={{ backgroundColor: category.color }}>
                      <ColorLensIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={category.name}
                    className="hover"
                    onClick={() => {
                      handleOpen(category.id);
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Button
          onClick={() => {
            handleOpen();
          }}
          fullWidth
          variant="contained"
          size="small"
        >
          {t('exercises:addCategory')}
        </Button>
      </Paper>
    </>
  );
};

export default CategoryEditor;
