import { Box, Card, Typography } from '@mui/material';
import categoryService from 'api/services/categoryService';
import CardTitle from 'components/CardTitle';
import TextItem from 'components/TextItem';
import { Category } from 'models/Category';
import { Exercise } from 'models/Exercise';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const GeneralInfo = ({ exercise }: { exercise: Exercise }) => {
  const [t] = useTranslation();

  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    if (exercise) {
      categoryService.getCategories().then((fetchedCategories) => {
        const foundCategory: Category = fetchedCategories.find(
          (fetchedCat) => fetchedCat.id == exercise.categoryId
        )!;
        setCategory(foundCategory);
      });
    }
  }, [exercise]);

  return (
    <Card
      sx={{
        height: '100%',
        p: 4,
      }}
      elevation={7}
    >
      <CardTitle text={t('exercises:generalInfo')} />
      <TextItem label={t('exercises:category')} value="" />
      <Box>
        <Typography color={category?.color} fontWeight={700}>
          {' '}
          {category?.name}
        </Typography>
      </Box>
      <TextItem
        label={t('exercises:description')}
        value={exercise?.description}
      />
    </Card>
  );
};

export default GeneralInfo;
