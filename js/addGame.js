document.getElementById('gameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const year = document.getElementById('year').value.trim();
    const coverUrl = document.getElementById('coverUrl').value.trim();

    if (!name || !description || !price || !year || !coverUrl) {
        alert("Alla fält måste fyllas i och får inte innehålla endast mellanslag.");
        return;
    }

    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/?/;
    if (!urlPattern.test(coverUrl)) {
        alert("Omslagsbild (URL) måste vara en giltig URL.");
        return;
    }

     // mm allt är korrekt, skickas formuläret
     this.submit();
});
