document.write(
<div class="navbar">
    <a id="navbar-home" href="home">Meme Master</a>
    
    <div class="dropdown">
        <button class="dropbtn" id="account_name">Account</button>
        <div class="dropdown-content">
            <a href="change-password">Change Password</a>
            <a href="" onclick="signOut()">Sign Out</a>
        </div>
    </div>
    <div class="dropdown">
        <button class="dropbtn">Add</button>
        <div class="dropdown-content">
            <a href="newMeme.html">New</a>
            <a href="import.html">Import</a>
        </div>
    </div>  
</div>
);