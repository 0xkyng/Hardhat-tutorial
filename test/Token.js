const {expect} = require("chai");
// Chai is an assertion library

describe("Token contract", function () {
    it("Deployment should assign the total supply of the tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        const ownerBalance = await hardhatToken.balanceof(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

    })
})