const bcrypt = require("bcryptjs");
const UserModel = require("./models/user");   // adjust path
const RoleModel = require("./models/roles"); // adjust path
const UserRoleModel = require("./models/user-roles");

async function seedSuperAdmin() {
  try {
    // 1️⃣ Check if any users exist
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      console.log("✅ Users already exist. Seeder skipped.");
      return;
    }

    // 2️⃣ Ensure "Super Admin" role exists
    let superAdminRole = await RoleModel.findOne({ role_name: "Super Admin" });
    if (!superAdminRole) {
      superAdminRole = await RoleModel.create({ role_name: "Super Admin" });
      console.log("🛠 Created Super Admin role");
    }

    // 3️⃣ Create Super Admin user
    const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10); // Change default password
   const user = await UserModel.create({
      firstName: "Super",
      lastName: "Admin",
      email: "superadmin@example.com",
      password: hashedPassword,
      userRole: superAdminRole._id,
      verified: true
    });

    let role = await RoleModel.findOne({ role_name: "Super Admin" });

    const createRole = await UserRoleModel.create({
            userId: user._id,
            roleId: role._id,
          });

          console.log("create seeder role ", createRole)

    console.log("🎉 Super Admin user created successfully");

  } catch (error) {
    console.error("❌ Seeder error:", error);
  }
}

module.exports = seedSuperAdmin;
