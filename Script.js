document.addEventListener('DOMContentLoaded', () => {
    const tokenContractAddress = "0xCb8bD8082b8C29455a3b6F1E6c3BCA749F3c56e7";
    const burnAddress = "0x000000000000000000000000000000000000dead";

    const totalSupplyUrl = `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenContractAddress}&apikey=T9ED94368EJYTUWPIZ1AYJ4IX6TX4UD4VH`;
    const burnAddressBalanceUrl = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenContractAddress}&address=${burnAddress}&tag=latest&apikey=T9ED94368EJYTUWPIZ1AYJ4IX6TX4UD4VH`;

    const circulatingSupply = document.getElementById("circulating-supply");
    const errorMessage = document.getElementById("error-message");

    Promise.all([
      fetch(totalSupplyUrl),
      fetch(burnAddressBalanceUrl)
    ])
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then((data) => {
        const totalSupplyValue = Number(data[0].result) / 10 ** 18;
        const burnAddressValue = Number(data[1].result) / 10 ** 18;
        const circulatingSupplyValue = (totalSupplyValue - burnAddressValue);
        const options = {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8
        };
        circulatingSupply.textContent = `${circulatingSupplyValue.toLocaleString('en-US', options)}`;
      })
      .catch((error) => {
        errorMessage.textContent = `Error fetching data: ${error.message}`;
      });
  });
