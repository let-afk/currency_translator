<script lang="ts">
  import { onMount } from "svelte";

  let currency1: number = 0;
  let currency2: number = 0;
  let currenciesRates: any;
  let nameCurrencies1: string = "RUB";
  let nameCurrencies2: string = "USD";

  onMount(() => {
    getExchangeRate();
  });

  function convertCurrency1ToCurrency2() {
    if (currenciesRates == undefined) {
      alert("currenciesRates is undefined");
      currency1 = 0;
      return;
    }

    if (currency1 < 0) {
      currency1 = 0;
    }

    currency2 =
      currency1 *
      (currenciesRates[nameCurrencies2] / currenciesRates[nameCurrencies1]);
  }

  function convertCurrency2ToCurrency1() {
    if (currenciesRates == undefined) {
      alert("currenciesRates is undefined");
      currency1 = 0;
      return;
    }

    if (currency2 < 0) {
      currency2 = 0;
    }

    currency1 =
      currency2 *
      (currenciesRates[nameCurrencies1] / currenciesRates[nameCurrencies2]);
  }

  async function getExchangeRate() {
    let response: Response = await fetch(
      "https://open.er-api.com/v6/latest/USD"
    );

    if (response.ok) {
      let json = await response.json();
      currenciesRates = json.rates;
    } else {
      console.log("err: ", response.status);
    }
  }

  function handleCurrencyChange(event: Event) {
    const target = event.target as HTMLSelectElement;

    if (target.id.at(-1) === "1") {
      nameCurrencies1 = target.value;
      convertCurrency1ToCurrency2();
    } else {
      nameCurrencies2 = target.value;
      convertCurrency2ToCurrency1();
    }
  }
</script>

<div>
  <a href="https://www.exchangerate-api.com">Курсы по API обменного курса</a>
  <br />
  <label for="currency-select">Выберите валюту 1:</label>
  <select
    id="currency-select1"
    bind:value={nameCurrencies1}
    on:change={handleCurrencyChange}
  >
    <option value="RUB" selected>RUB</option>
    <option value="TRY">TRY</option>
    <option value="USD">USD</option>
  </select>
  <input
    type="number"
    bind:value={currency1}
    on:input={convertCurrency1ToCurrency2}
  />
  <br />
  <label for="currency-select">Выберите валюту 2:</label>
  <select
    id="currency-select2"
    bind:value={nameCurrencies2}
    on:change={handleCurrencyChange}
  >
    <option value="RUB">RUB</option>
    <option value="TRY">TRY</option>
    <option value="USD" selected>USD</option>
  </select>
  <input
    type="number"
    bind:value={currency2}
    on:input={convertCurrency2ToCurrency1}
  />
</div>

<style>
  input {
    margin: 5px;
    padding: 5px;
  }
</style>
