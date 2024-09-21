export   const handleChange = (country) => {
    
     
 
     switch (country) {
       case "Mexico":
         return "Mexique"; // Set ID for Mexico
         break;
       case "North Cyprus":
         return "North Cyprus"; // Set ID for North Cyprus
         break;
       case "Spain":
        return "Espagne"; // Set ID for Spain
         break;
       case "Republic Dominica":
         return "République Dominique"; // Set ID for Republic Dominica
         break;
       case "Portugal":
         return "Portugal"; // Set ID for Portugal
         break;
       case "Canada":
         return "Canada"; // Set ID for Canada
         break;
       case "United Arab Emirates":
         return "Émirats Arabes Unis"; // Set ID for UAE
         break;
       default:
         return ""; // Default case for "All countries"
     }
 
     
   };