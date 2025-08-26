const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");   // adjust path
const RoleModel = require("../models/roles"); // adjust path
const UserRoleModel = require("../models/user-roles");

require("dotenv").config();

async function runMigration() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if Super Admin already exists
    const existingSuperAdmin = await UserModel.findOne({ email: "superadmin@example.com" });
    if (existingSuperAdmin) {
      process.exit(0);
    }

    // Create Super Admin role if missing
    let superAdminRole = await RoleModel.findOne({ role_name: "Super Admin" });
    if (!superAdminRole) {
      superAdminRole = await RoleModel.create({ role_name: "Super Admin" });
     
    }

    // Create Super Admin user
    const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10);
    const user = await UserModel.create({
      firstName: "Super",
      lastName: "Admin",
      email: "superadmin@example.com",
      password: hashedPassword,
      userRole: superAdminRole._id,
      verified: true
    });

    const createRole = await UserRoleModel.create({
            userId: user._id,
            roleId: superAdminRole._id,
          });
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();