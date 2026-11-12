const navbar = document.getElementById("navbar");

navbar.innerHTML = `
<nav class="flex justify-between items-center min-h-[80px] max-w-6xl mx-auto">
            <div class="logo text-[25px] font-bold">Logo</div>
            <ul class="flex space-x-5">
                <li class="cursor-pointer">
                <a href="/index.html">
                    <i class="fa-solid fa-house"></i>
                    <span>Demande d'echange</span>
                </a>
                </li>
                <li class="cursor-pointer">
                    <a href="/livre.html">
                        <i class="fa-solid fa-book"></i>
                        <span>Livre</span>
                    </a>
                </li>
                <li class="cursor-pointer">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span>A Propos</span>
                </li>
            </ul>
            <div class="w-[40%] flex justify-end space-x-4">
                <i class="fa-solid fa-circle-user"></i>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </nav>
`;
