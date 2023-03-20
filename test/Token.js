const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [deployer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    const deployerBalance = await hardhatToken.balanceOf(deployer.address);
    expect(await hardhatToken.totalSupply()).to.equal(deployerBalance);
  });

  // Transfer test
  it("Should transfer the correct amount to te second account", async function () {
    const [deployer, acc1, acc2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const token = await Token.deploy();

    // Transfer 95 tokens from deployer to acc1
    await token.transfer(acc1.address, 95);
    expect(await token.balanceOf(acc1.address)).to.equal(95);

    // Tranfer from acc1 to acc2
    await token.connect(acc1).transfer(acc2.address, 40);
    expect(await token.balanceOf(acc2.address)).to.equal(40);

  })
});