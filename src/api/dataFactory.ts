// Generate a random phone number
// import {Employee} from "../types";

function generatePhoneNumber() {
  const countryCode = "+381"; // You can adjust the country code as needed
  const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return countryCode + randomNumber;
}

const mockRawDataType = {
  data: {
    count: 0,
    employees: [] as Array<{
      _id: string;
      deletedAt: null;
      isDeleted: boolean;
      dateOfBirth: string;
      dateOfEmployment: string;
      email: string;
      homeAddress: {
        addressLine2: string;
        addressLine1: string;
        ZIPCode: string;
        city: string;
      };
      name: string;
      phoneNumber: string;
      __v: number;
    }>,
  },
};

// Generate mock data only if not populated
// if (!mockRawData.data || !mockRawData.data.employees) {
//   const mockEmployees = [];
//   for (let i = 0; i < 40; i++) {
//     mockEmployees.push({
//       _id: `mockId${i}`,
//       deletedAt: null,
//       isDeleted: false,
//       dateOfBirth: "2005-08-16",
//       dateOfEmployment: "2023-08-16",
//       email: `employee${i}@gmail.com`,
//       homeAddress: {
//         addressLine2: `address line 2 ${i}`,
//         addressLine1: `address line 1 ${i}`,
//         ZIPCode: "37000",
//         city: `city ${i}`,
//       },
//       name: `Employee ${i}`,
//       phoneNumber: generatePhoneNumber(),
//       __v: 0,
//     });
//   }
//
//   mockRawData.data.count = mockEmployees.length;
//   mockRawData.data.employees = mockEmployees;
// }
//
// // Function to update employee data by ID
// // function updateEmployeeById(employeeId, updatedData) {
// //   const employeeIndex = mockRawData.data.employees.findIndex(emp => emp._id === employeeId);
// //   if (employeeIndex !== -1) {
// //     mockRawData.data.employees[employeeIndex] = {
// //       ...mockRawData.data.employees[employeeIndex],
// //       ...updatedData,
// //     };
// //   }
// // }
//
// // Example of how to use the update function
// // const employeeIdToUpdate = 'mockId2'; // Replace with the actual employee ID you want to update
// // const updatedData = {
// //   name: 'Updated Employee Name',
// //   email: 'updated.email@example.com',
// //   // Update other properties as needed
// // };
//
// // updateEmployeeById(employeeIdToUpdate, updatedData);
//
// // Export updated mock data
// export {mockRawData};
export const mockRawData: typeof mockRawDataType = {
  data: {
    count: 0,
    employees: [],
  }
}

export const getMockRawData = () => {
  const newData = JSON.parse(JSON.stringify(mockRawData)); // Create a new object
  if (!newData.data.employees.length) {
    const mockEmployees: any[] = [];
    for (let i = 0; i < 40; i++) {
      mockEmployees.push({
        _id: `mockId${i}`,
        deletedAt: null,
        isDeleted: false,
        dateOfBirth: "2005-08-16",
        dateOfEmployment: "2023-08-16",
        email: `employee${i}@gmail.com`,
        homeAddress: {
          addressLine2: `address line 2 ${i}`,
          addressLine1: `address line 1 ${i}`,
          ZIPCode: "37000",
          city: `city ${i}`,
        },
        name: `Employee ${i}`,
        phoneNumber: generatePhoneNumber(),
        __v: 0,
      });
    }

    newData.data.count = mockEmployees.length;
    newData.data.employees = mockEmployees;

  }

  console.log('getMockRawData: ', newData);
  return newData;
};

console.log('MOCKSTORE: ', mockRawData);