/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del();
  await knex('roles').insert([
    { name: 'admin' },
    { name: 'landlord' },
    { name: 'tenants' },
  ]);
  await knex('users').del();
  await knex('users').insert([
    {
      firstname: 'Abdullahi',
      lastname: 'Mohamed',
      email: 'admin@gmail.com',
      password: '$2b$12$CWOjqpYOA18P69FhUbPMvuF3yiBMh7Gjjlsp7C0txbVNzvTnbhOK6',
      phone: 4123567,
      address: '150',
      imageUrl: 'file-1714568379137-668006100.png',
      roleId: 1,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Fatima',
      lastname: 'Ali',
      email: 'land@gmail.com',
      password: '$2b$12$CWOjqpYOA18P69FhUbPMvuF3yiBMh7Gjjlsp7C0txbVNzvTnbhOK6',
      phone: 4123567,
      address: 'New Hargeisa',
      imageUrl: 'file-1715537548211-737628232.gif',
      roleId: 2,
      isActive: false,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Ahmed',
      lastname: 'Hassan',
      email: 'me@gmail.com',
      password: '$2b$12$CWOjqpYOA18P69FhUbPMvuF3yiBMh7Gjjlsp7C0txbVNzvTnbhOK6',
      phone: 4123567,
      address: 'Jigjiga Yar',
      imageUrl: 'file-1717689830132-560115462.png',
      roleId: 3,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Amina',
      lastname: 'Ibrahim',
      email: 'amina@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Siinay',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Omar',
      lastname: 'Mohamed',
      email: 'omar@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Calamdaha',
      imageUrl: '',
      roleId: 3,
      isActive: false,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Abdullahi',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Fatima',
      lastname: 'Ali',
      email: 'fatima@gmail.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'New Hargeisa',
      imageUrl: '',
      roleId: 3,
      isActive: false,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Ahmed',
      lastname: 'Hassan',
      email: 'ahmed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Jigjiga Yar',
      imageUrl: '',
      roleId: 3,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Amina',
      lastname: 'Ibrahim',
      email: 'amina@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Siinay',
      imageUrl: '',
      roleId: 3,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Omar',
      lastname: 'Mohamed',
      email: 'omar@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: 'Calamdaha',
      imageUrl: '',
      roleId: 3,
      isActive: false,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },

    {
      firstname: 'farxaan',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Abdullahi',
      lastname: 'Ismaciil',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'xirsi',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Cumar',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'ali',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Abdullahi',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'Hamse',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'C/rahmaan',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
    {
      firstname: 'C/fataax',
      lastname: 'Mohamed',
      email: 'abdullahi.mohamed@example.com',
      password: 'hashed_password',
      phone: 4123567,
      address: '150',
      imageUrl: '',
      roleId: 2,
      isActive: true,
      city: 'Hargeisa',
      state: 'Maroodi Jeex',
      birthday: '1999-12-12',
    },
  ]);
};
