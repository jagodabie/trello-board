import { useGetAllTasksQuery } from '../../store/slices/apiSlice';
export const Data = () => {
  const { data: allProductsData, isLoading } = useGetAllTasksQuery({}); // Provide an empty object as the argument
  //   const { data: singleProductData } = useGetProductQuery('iphone');

  console.log(allProductsData);
  //   console.log(singleProductData);

  if (isLoading) return <h1> Loading...</h1>;
  return <div> Data: </div>;
};
