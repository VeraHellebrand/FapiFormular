import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SummaryPage = () => {
   const location = useLocation();
   const { orderDetails, cart } = location.state || {};
   const [exchangeRates, setExchangeRates] = useState([]);
   const [selectedCurrency, setSelectedCurrency] = useState('USD');
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchExchangeRates = async () => {
         try {
            const response = await fetch(
               'https://cors-anywhere.herokuapp.com/https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt'
            );
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.text();
            if (!data) {
               throw new Error('No data available');
            }

            const lines = data.split('\n');
            const currencies = {};
            lines.forEach((line) => {
               const parts = line.split('|');
               if (parts.length === 5) {
                  currencies[parts[3]] = parseFloat(parts[4].replace(',', '.'));
               }
            });

            // Vybereme pouze určené měny
            const selectedCurrencies = ['USD', 'EUR', 'GBP', 'PLN']; // Zvolené měny
            const filteredRates = selectedCurrencies.map((currency) => ({
               code: currency,
               rate: currencies[currency] || 1, // Pokud měna není k dispozici, použijeme rate 1 (nulová konverze)
            }));

            setExchangeRates(filteredRates); // Uložení načtených dat do stavu exchangeRates
         } catch (error) {
            console.error('Error fetching exchange rates:', error);
            setError('Nepodařilo se načíst aktuální kurzy měn.');
         }
      };

      fetchExchangeRates();
   }, []);

   const calculateItemTotal = (item) => {
      return item.price * item.quantity;
   };

   const calculateOrderTotal = () => {
      const totalWithVAT = cart.reduce(
         (total, item) => total + calculateItemTotal(item),
         0
      );
      const vat = (totalWithVAT/121) * 21;
      const totalWithoutVAT = totalWithVAT - vat;

      return {
         totalWithVAT: totalWithVAT.toFixed(2),
         vat: vat.toFixed(2),
         totalWithoutVAT: totalWithoutVAT.toFixed(2),
      };
   };

   const convertCurrency = (amount, currency) => {
      const selectedRate = exchangeRates.find((rate) => rate.code === currency)?.rate;
      if (selectedRate) {
         return (amount / selectedRate).toFixed(2); // Přepočet na základě aktuálního kurzu
      }
      return 'Není k dispozici';
   };

   const handleCurrencyChange = (event) => {
      setSelectedCurrency(event.target.value);
   };

   const navigate = useNavigate();

   const handleGoBack = () => {
      navigate(-1); // Navigace zpět o jeden krok (na domovskou stránku)
   };

   return (
      <div className="container summary-page mt-5">
         <h2 className="mb-4">Shrnutí objednávky</h2>
         {orderDetails && (
            <div className="mb-4">
               <h3>Osobní údaje</h3>
               <p>
                  <strong>Jméno:</strong> {orderDetails.firstName}{' '}
                  {orderDetails.lastName}
               </p>
               <p>
                  <strong>Email:</strong> {orderDetails.email}
               </p>
               <p>
                  <strong>Telefon:</strong> {orderDetails.phone}
               </p>
               <p>
                  <strong>Adresa:</strong> {orderDetails.street}{' '}
                  {orderDetails.streetNumber}, {orderDetails.city},{' '}
                  {orderDetails.zipCode}
               </p>
            </div>
         )}
         {cart && (
            <div>
               <h3 className="mb-3">Celková objednávka</h3>
               <ul className="list-group mb-4">
                  {cart.map((item) => (
                     <li key={item.id} className="list-group-item">
                        <strong>{item.name}</strong>
                        <br />
                        Cena za kus: {item.price.toFixed(2)} Kč
                        <br />
                        Množství: {item.quantity} ks
                     </li>
                  ))}
               </ul>
               <div className="card">
                  <div className="card-body">
                     <h4 className="card-text">
                        Celková cena včetně DPH:{' '}
                        {calculateOrderTotal().totalWithVAT} Kč
                     </h4>
                     <p className="card-text">
                        DPH (21%): {calculateOrderTotal().vat} Kč
                     </p>
                     <p className="card-text">
                        Celková cena bez DPH:{' '}
                        {calculateOrderTotal().totalWithoutVAT} Kč
                     </p>
                     <div className="mb-3">
                        <label htmlFor="currencySelect" className="form-label">
                           Zvolte měnu:
                        </label>
                        <select
                           id="currencySelect"
                           className="form-select"
                           value={selectedCurrency}
                           onChange={handleCurrencyChange}
                        >
                           {exchangeRates.map((rate) => (
                              <option key={rate.code} value={rate.code}>
                                 {rate.code}
                              </option>
                           ))}
                        </select>
                     </div>
                     <p className="card-text">
                        Celková cena v {selectedCurrency}:{' '}
                        {convertCurrency(
                           parseFloat(calculateOrderTotal().totalWithVAT),
                           selectedCurrency
                        )}
                     </p>
                  </div>
               </div>
               <button
                  className="btn btn-success mt-3 me-3"
                  onClick={() => console.log('Kliknutí na odeslat')}
               >
                  Odeslat
               </button>
               <button className="btn btn-secondary mt-3 me-3" onClick={handleGoBack}>
                  Zpět
               </button>
               {error && <p className="text-danger mt-3">{error}</p>}
            </div>
         )}
      </div>
   );
};

export default SummaryPage;
