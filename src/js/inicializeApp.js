function InicializeApp() {
    var firebaseConfig = {
        apiKey: "AIzaSyDrHHmem7XB8eBYEMsGqAZRlN0qp1sWMr0",
        authDomain: "candles-bot-a6b2d.firebaseapp.com",
        projectId: "candles-bot-a6b2d",
        storageBucket: "candles-bot-a6b2d.appspot.com",
        messagingSenderId: "575470660322",
        appId: "1:575470660322:web:7879257c74c16339a30cbb",
        measurementId: "G-D7NLTM5B31",
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();    
    console.log("Firebase Iniciado");
}
