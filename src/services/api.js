// // services/api.js
// export const fetchQuizData = async () => {
//   try {
//     const response = await fetch('https://api.jsonserve.com/Uw5CrX', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     // If API fails, use fallback data
//     if (!data || !data.questions) {
//       return {
//         questions: [
//           {
//             description: "There are two metallic spheres of same radii but one is solid and the other is hollow, then:",
//             topic: "Electric Charges Fields",
//             options: [
//               { description: "Solid sphere can be given more charge", is_correct: false },
//               { description: "Hollow sphere can be given more charge", is_correct: true },
//               { description: "They can be charged equally", is_correct: false },
//               { description: "None of the above", is_correct: false }
//             ]
//           },
//           {
//             description: "Calculate the power of a crane in watts, which lifts a mass of 100 Kg to a height of 10m in 20s",
//             topic: "Work, Energy and Power",
//             options: [
//               { description: "490 W", is_correct: true },
//               { description: "980 W", is_correct: false },
//               { description: "245 W", is_correct: false },
//               { description: "735 W", is_correct: false }
//             ]
//           }
//         ]
//       };
//     }
    
//     return data;
//   } catch (error) {
//     console.error('Error fetching quiz data:', error);
//     // Return fallback data on error
//     return {
//       questions: [
//         {
//           description: "There are two metallic spheres of same radii but one is solid and the other is hollow, then:",
//           topic: "Electric Charges Fields",
//           options: [
//             { description: "Solid sphere can be given more charge", is_correct: false },
//             { description: "Hollow sphere can be given more charge", is_correct: true },
//             { description: "They can be charged equally", is_correct: false },
//             { description: "None of the above", is_correct: false }
//           ]
//         },
//         {
//           description: "Calculate the power of a crane in watts, which lifts a mass of 100 Kg to a height of 10m in 20s",
//           topic: "Work, Energy and Power",
//           options: [
//             { description: "490 W", is_correct: true },
//             { description: "980 W", is_correct: false },
//             { description: "245 W", is_correct: false },
//             { description: "735 W", is_correct: false }
//           ]
//         }
//       ]
//     };
//   }
// };




// services/api.js
export const fetchQuizData = async () => {
  try {
    // Using a different CORS proxy
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = encodeURIComponent('https://api.jsonserve.com/Uw5CrX');
    
    const response = await fetch(proxyUrl + targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data); // Debug log
    return data;
    
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    // Return fallback data
    return {
      id: 60,
      title: "Genetics and Evolution",
      questions: [
        {
          id: 3342,
          description: "If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is :",
          options: [
            { id: 13379, description: "5'UUUU3'", is_correct: false },
            { id: 13380, description: "3'UUUU5'", is_correct: false },
            { id: 13381, description: "5'AAAU3'", is_correct: true },
            { id: 13382, description: "3'AAAU5'", is_correct: false }
          ]
        }
        // Add more questions here if needed
      ]
    };
  }
};