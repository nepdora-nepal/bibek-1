export const useThemeQuery = () => {
  return {
    data: {
      data: [
        {
          data: {
            theme: {
              colors: {
                text: "#0F172A",
                primary: "#3B82F6",
                secondary: "#F59E0B",
              },
            },
          },
        },
      ],
    },
    isLoading: false,
  };
};
