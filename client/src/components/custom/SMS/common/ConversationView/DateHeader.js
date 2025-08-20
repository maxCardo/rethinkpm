const DateHeader = ({ date }) => {
  const formatDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    // Check if it's today
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    // Check if it's yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    // Otherwise show the full date
    return messageDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex justify-center my-4">
      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
        {formatDate(date)}
      </div>
    </div>
  );
};

export default DateHeader;
