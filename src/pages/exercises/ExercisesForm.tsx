import { Autocomplete, Box, Slider } from '@mui/material';
import categoryService from 'api/services/categoryService';
import exerciseService from 'api/services/exerciseService';
import { Controls } from 'components/Controls';
import { Form, useForm } from 'components/Form';
import Section from 'components/Section';
import { useAppDispatch } from 'hooks';
import { Category } from 'models/Category';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from 'redux/slices/snackbarSlice';
import CategoryEditor from './components/CategoryEditor';

const ExerciseForm = () => {
  const { values, setValues, handleInput } = useForm({
    name: '',
    description: '',
    url: '',
    categoryId: 1,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<any[]>([]);

  let { id } = useParams();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    e.stopPropagation();
    if (id) {
      exerciseService
        .updateExercise(+id, values)
        .then((exercise) => {
          dispatch(showSuccess(t('exercises:isExerciseCreated')));
          navigate('/exercises/' + exercise.id);
        })
        .catch((err) => {
          const message = err.response?.data?.message;
          dispatch(showError(message));
        });
    } else {
      exerciseService
        .addExercise(values)
        .then((exercise) => {
          dispatch(showSuccess(t('exercises:isExerciseUpdated')));
          navigate('/exercises/' + exercise.id);
        })
        .catch((err) => {
          const message = err.response?.data?.message;
          dispatch(showError(message));
        });
    }
  };

  const handleCategoryInput = (e: any, category: any) => {
    setValues({ ...values, categoryId: category?.id });
  };

  useEffect(() => {
    categoryService
      .getCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(showError(message));
      });


      if (id) {
        exerciseService.getExercise(+id).then((fetchedExercise) => {
          setValues({
            ...fetchedExercise,
          });
        });
      }
  }, []);

  useEffect(() => {
    let newCategoriesOptions = categories.map((category) => ({
      label: category.name,
      id: category.id,
    }));
    setCategoriesOptions(newCategoriesOptions);
  }, [categories]);

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        maxWidth={600}
        m="auto"
        display="flex"
        flexDirection={'column'}
        gap={2}
      >
        <Section
          first
          label={id ? t('exercises:exerciseEdit') : t('exercises:exerciseNew')}
        />
        <Controls.Input
          multiline
          rows={2}
          name="name"
          label={t('exercises:name')}
          onChange={handleInput}
          value={values.name}
        />
        <Controls.Input
          multiline
          rows={2}
          name="description"
          label={t('exercises:description')}
          onChange={handleInput}
          value={values.description}
        />
        <Controls.Input
          name="url"
          label={t('exercises:url')}
          onChange={handleInput}
          value={values.url}
        />

        <Controls.Autocomplete
          validators={['required']}
          errorMessages={[t('formRequired')]}
          name="categoryId"
          onChange={handleCategoryInput}
          options={categoriesOptions}
          value={
            categoriesOptions.find(
              (category: any) => category.id == values.categoryId
            ) ?? ''
          }
          label={t('exercises:category')}
        />

        <CategoryEditor categories={categories} setCategories={setCategories} />

        <Box display={'flex'} justifyContent="space-between">
          <Controls.Button
            onClick={() => {navigate('/exercises');}}
            color="primary"
            size="large"
            label={t('cancel')}
            variant="outlined"
          />
          <Controls.Button
            color="primary"
            size="large"
            label={t('save')}
            type="submit"
            variant="contained"
          />
        </Box>
      </Box>
    </Form>
  );
};

export default ExerciseForm;
