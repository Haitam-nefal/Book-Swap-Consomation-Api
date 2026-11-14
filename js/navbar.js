const navbar = document.getElementById("navbar");

navbar.innerHTML = `
<nav class="flex justify-between items-center min-h-[80px] max-w-6xl mx-auto">
            <div class="w-[60px] h-[60px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" class="w-full h-full">
                <defs>
                <clipPath id="htmCircleClip">
                    <circle cx="200" cy="200" r="196" />
                </clipPath>
                </defs>

                <g clip-path="url(#htmCircleClip)">
                <circle cx="200" cy="200" r="196" fill="#F6F5F0" stroke="#E2DFD5" stroke-width="4" />

                <g transform="translate(0, -10)">
                    <g stroke="#17385B" stroke-width="3.5" fill="none" stroke-linecap="round">
                    <polyline points="150,115 162,92 188,80 212,92" />
                    <polyline points="222,122 235,104 258,108" />
                    </g>
                    <g fill="#17385B">
                    <circle cx="162" cy="92" r="5" />
                    <circle cx="188" cy="80" r="5.5" />
                    <circle cx="235" cy="104" r="5" />
                    <circle cx="258" cy="108" r="5.5" />
                    </g>
                    <circle cx="212" cy="92" r="5" fill="#E38B29" />

                    <path d="M 122 135 L 122 212 Q 165 212 200 228 Q 235 212 278 212 L 278 135" fill="none" stroke="#17385B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />

                    <path d="M 136 142 Q 168 142 200 212 Q 168 198 136 198 Z" fill="#FDFBF7" stroke="#17385B" stroke-width="6" stroke-linejoin="round" />
                    <path d="M 264 132 Q 232 132 200 212 Q 232 198 264 198 Z" fill="#FDFBF7" stroke="#E38B29" stroke-width="6" stroke-linejoin="round" />

                    <path d="M 136 135 C 160 112, 195 112, 222 92" fill="none" stroke="#E38B29" stroke-width="7" stroke-linecap="round" />

                    <path d="M 136 155 C 165 125, 205 125, 236 90" fill="none" stroke="#17385B" stroke-width="8" stroke-linecap="round" />
                    <polygon points="246,78 223,86 240,102" fill="#17385B" />

                    <path d="M 196 205 C 175 190, 178 162, 198 142 C 202 156, 212 158, 210 148 C 224 164, 224 192, 202 205 C 208 190, 204 178, 198 174 C 194 182, 194 194, 196 205 Z" fill="#E38B29" />
                </g>

                <text x="200" y="292" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="76" fill="#17385B" text-anchor="middle" letter-spacing="4">HTM</text>

                <text x="200" y="324" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="15.5" fill="#17385B" text-anchor="middle" letter-spacing="1.2">DIGITAL BOOK PLATFORM</text>
                </g>
            </svg>
            </div>
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
