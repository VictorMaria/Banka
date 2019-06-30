const markUps = {
    transactMarkUp: `<div class = 'new-transaction' id = 'new-transaction'>
                    <br>
                    <h2 id = 'h2-text'>New Transaction</h2>
                    <input id = 'amount' type = 'text' placeholder = 'Amount'><br><br>
                    <input type = 'text' placeholder = 'Description'><br><br>
                    <select id = 'options' name = 'transaction type'>
                    <option value = 'Select Transaction Type'>Select Transaction Type</option>
                    <option value = 'Credit'>Credit</option>
                    <option value = 'Debit'>Debit</option>
                    </select><br><br>
                    <div class = 'submit-div'>
                    <button class = 'submit' onclick = 'finish()'>Finish</button>
                    </div>
                    <br></div>`,
}

export default markUps;