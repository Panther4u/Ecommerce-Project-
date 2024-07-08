// export const userColumns = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "user",
//     headerName: "User",
//     width: 230,
//     renderCell: (params) => {
//       return (
//         <div className="cellWithImg">
//           <img className="cellImg" src={params.row.img} alt="avatar" />
//           {params.row.username}
//         </div>
//       );
//     },
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     width: 230,
//   },

//   {
//     field: "age",
//     headerName: "Age",
//     width: 100,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     width: 160,
//     renderCell: (params) => {
//       return (
//         <div className={`cellWithStatus ${params.row.status}`}>
//           {params.row.status}
//         </div>
//       );
//     },
//   },
// ];

export const userColumns = [
  {
    field: "userId",
    headerName: "ID",
    width: 150,
    renderCell: (params) => {
      const shortId = params.row.userId.slice(-12);
      return <span>{shortId}</span>;
    },
  },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      const profileImage = params.row.profileImage;
      const imgSrc = profileImage ? `http://localhost:8000/${profileImage}` : "src/Assets/Images/Avatar.jpg";
      const username = params.row.username || "-";
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={imgSrc} alt="avatar" />
          {username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email Address",
    width: 230,
    renderCell: (params) => {
      return <span>{params.row.email || '-'}</span>;
    },
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 160,
    renderCell: (params) => {
      return <span>{params.row.mobileNumber || '-'}</span>;
    },
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    renderCell: (params) => {
      const address = [params.row.streetAddress, params.row.townCity, params.row.pincode].filter(Boolean).join(", ");
      return <span>{address || '-'}</span>;
    },
  },
  {
    field: "status",
    headerName: "Account Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status || ''}`}>
          {params.row.status || '-'}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    renderCell: (params) => {
      const date = params.row.createdAt ? new Date(params.row.createdAt) : null;
      return (
        <span>
          {date ? date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : '-'}
        </span>
      );
    },
  },
];


//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
