import React from "react";

const QTYButton = ({ QTY, setQTY }) => {
    
    const increment = () => setQTY(QTY + 1);
    const decrement = () => setQTY(Math.max(1, QTY - 1));
    return (
        <div className="d-flex align-items-center gap-2">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={decrement}>-</button>
          <span>{QTY}</span>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={increment}>+</button>
        </div>
      );
}
export default React.memo(QTYButton); 
