import styles from "./Calculator.module.scss";
import { useState } from "react";

export const Calculator = () => {
  const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "00"];
  const mathSymbols = ["/", "*", "-", "+", "="];
  const clearSymbols = ["AC", "%", "DEL"];

  const [example, setExample] = useState("");
  const [operation, setOperation] = useState("");
  const [total, setTotal] = useState(0);

  const checkLastSymbol = (symbol) => {
    const index = mathSymbols.findIndex((el) => el === example.at(-1));

    if (index !== -1) {
      setExample((prevExample) => prevExample.slice(0, -1) + symbol);
    } else {
      setExample((prevExample) => prevExample + " " + symbol);
    }
  };

  const handleClick = (symbol, obj = null) => {
    switch (symbol) {
      case "/": {
        if (obj) {
          if (obj.sum.toString().slice(-1) === "%") {
            return (+obj.sum.slice(0 ,-1) / 100) / +(obj.num || 0);
          } else if (obj?.num?.slice(-1) === "%") {
            return +obj.sum / (+(obj.num.slice(0, -1) || 0) / 100);
          } else {
            return +obj.sum / +(obj.num || 1);
          }
        } else {
          checkLastSymbol(symbol);
          setOperation(symbol);
        }
        break;
      }
      case "*": {
        if (obj) {
          if (obj.sum.toString().slice(-1) === "%") {
            return (+obj.sum.slice(0 ,-1) / 100) * +(obj.num || 0);
          } else if (obj?.num?.slice(-1) === "%") {
            return +obj.sum * (+(obj.num.slice(0, -1) || 0) / 100);
          } else {
            return +obj.sum * +(obj.num || 1);
          }
        } else {
          checkLastSymbol(symbol);
          setOperation(symbol);
        }
        break;
      }
      case "-": {
        if (obj) {
          if (obj.sum.toString().slice(-1) === "%") {
            return (+obj.sum.slice(0 ,-1) * obj.num / 100) - +(obj.num || 0);
          } else if (obj?.num?.slice(-1) === "%") {
            return +obj.sum - (+(obj.num.slice(0, -1) || 0) * obj.sum / 100);
          } else {
            return +obj.sum - +(obj.num || 0);
          }
        } else {
          checkLastSymbol(symbol);
          setOperation(symbol);
        }
        break;
      }
      case "+": {
        if (obj) {
          if (obj.sum.toString().slice(-1) === "%") {
            return (+obj.sum.slice(0 ,-1) * obj.num / 100) + +(obj.num || 0);
          } else if (obj?.num?.slice(-1) === "%") {
            return +obj.sum + (+(obj.num.slice(0, -1) || 0) * obj.sum / 100);
          } else {
            return +obj.sum + +(obj.num || 0);
          }
        } else {
          checkLastSymbol(symbol);
          setOperation(symbol);
        }
        break;
      }
      case "=": {
        console.log("-------------------------------------------");
        const exampleArray = example.split(" ");
        let sum = exampleArray[0];
        console.log(exampleArray);
        for (let i = 0; i < exampleArray.length; i++) {
          console.log(exampleArray[i + 1], {sum, num: exampleArray[i + 2]});
          if (!exampleArray[i + 1]) {
            const output = sum.toString().slice(-1) === "%" ? +sum.slice(0, -1) / 100 : +sum;
            setExample(output.toString());
            setTotal(output.toString());
            return;
          }
          
          sum = handleClick(exampleArray[i + 1], {sum, num: exampleArray[i + 2]});
          i++;
        }

        setTotal(sum.toString());
        setExample(sum.toString());
        break;
      }
      case "AC": {
        setExample("");
        setOperation("");
        setTotal(0);
        break;
      }
      case "%": {
        setExample((prevExample) => prevExample + symbol);
        break;
      }
      case "DEL": {
        const index = mathSymbols.findIndex((el) => el === example.at(-1));

        if (index !== -1) {
          setExample((prevExample) => prevExample.slice(0, -2));
        } else {
          setExample((prevExample) => prevExample.slice(0, -1));
        }

        setOperation("");
        break;
      }
      default: {
        setExample((prevExample) => !operation ? prevExample + symbol : prevExample + " " + symbol);
        setOperation("");
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
