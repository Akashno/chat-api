const assert = require("chai").assert;

const { addUser } = require("./user-test-helper");

const User = require("../../modules/user/user-model");

const user = {
  room: "62e6229f88c7dde87ce8863d",
  username: "Akash",
  avatar: "https://png.pngtree.com/png-clipart/20220329/ourmid/pngtree-d-rendering-dark-skin-male-character-profile-with-mustache-and-beard-png-image_4518861.png",
  socket: "432342323",
};
describe("App", () => {
  describe("Add User", () => {
    it("Create new user", (done) => {
      const newUser = new User(user);
      newUser.save().then(() => {
        assert.equal(!newUser.isNew);
        done()
      });
    });
  });
});
