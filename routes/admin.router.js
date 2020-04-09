const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');



const mongoose = require('mongoose');

const Patient = require('../models/Patient');

const AdminBroOptions = {
  resources: [Patient],
}

const Doctor = require('../models/Doctor');

const AdminBroOptions1 = {
    resources: [Doctor],
}

const Reports = require('../models/Report');

const AdminBroOptions2 = {
    resources: [Reports],
}

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'pranjita@bhatta',
    password: process.env.ADMIN_PASSWORD || '123456',
  }


router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.urlencoded({ extended: false }));  
  const router1 = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN
      }
      return null
    }
  })

module.exports = router1;