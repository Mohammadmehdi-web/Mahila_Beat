export const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; // Handle empty values
    const [month, day, year] = dateString.split('/');
    return `${day}/${month}/${year}`;
  };