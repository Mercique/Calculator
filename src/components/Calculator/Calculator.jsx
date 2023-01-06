import styles from "./Calculator.module.scss";
import { useState } from "react";

export const Calculator = () => {
  const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "00"];
  const mathSymbols = ["/", "*", "-", "+", "="];
  const clearSymbols = ["AC", "%", "DEL"];

  const [example, setExample] = useState("");
  const [operation, setOperation] = useState("");
  const [num, setNum] = useState("");
  const [total, setTotal] = useState("");

  const checkLastSymbol = (symbol) => {
    const index = mathSymbols.findIndex((el) => el === example.at(-1));

    if (index !== -1) {
      setExample((prevExample) => prevExample.slice(0, -1) + symbol);
    } else {
      setExample((prevExample) => prevExample + symbol);
    }
  };

  const handleClick = (symbol) => {
    switch (symbol) {
      case "/": {
        checkLastSymbol(symbol);
        break;
      }
      case "*": {
        checkLastSymbol(symbol);
        break;
      }
      case "-": {
        checkLastSymbol(symbol);
        break;
      }
      case "+": {
        checkLastSymbol(symbol);
        break;
      }
      case "=": {
        break;
      }
      case "AC": {
        break;
      }
      case "%": {
        break;
      }
      case "DEL": {
        break;
      }
      default: {
        setExample((prevExample) => prevExample + symbol);
        break;
      }
    }
  };

  return (
    <div className={styles.calculator}>
      <header className={styles.calculatorHeader}>Calculator</header>
      <div className={styles.calculatorBox}>
        <div className={styles.calculatorInput}>
          <div className={styles.calculatorExample}>{example}</div>
          <div className={styles.calculatorTotal}>
            <span className={styles.equal}>=</span>
            <span className={styles.total}>{total}</span>
          </div>
        </div>
        <div className={styles.calculatorButtons}>
          <div className={styles.calculatorButtonsLeft}>
            <div className={styles.calculatorClearSymbols}>
              { clearSymbols.map((symbol, idx) => (
                <button type="button" onClick={() => handleClick(symbol)} key={idx}>{symbol}</button>
              )) }
            </div>
            <div className={styles.calculatorNums}>
              { nums.map((num, idx) => (
                <button type="button" onClick={() => handleClick(num)} key={idx}>{num}</button>
              )) }
            </div>
          </div>
          <div className={styles.calculatorButtonsRight}>
            { mathSymbols.map((mathSymbol, idx) => (
              <button type="button" onClick={() => handleClick(mathSymbol)} key={idx}>{mathSymbol}</button>
            )) }
          </div>
        </div>
      </div>
    </div>
  );
};
