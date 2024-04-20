export const navItems = [
    {
        name: 'Home',
        children: [
            {name: 'All', route: '/all'},
            {name: 'Movies', route: '/movies'},
            {name: 'TV Shows', route: '/shows'},
            {name: 'Sports', route: '/sports'}
        ]
    },
    {
        name: 'Store',
        children: [
            {name: 'All', route: '/all'},
            {name: 'Rent or Buy', route: '/rentorbuy'},
            {name: 'Channels', route: '/channels'},
            {name: 'Deals', route: '/deals'}
        ]
    },
    {
        name: 'Live TV',
        children: []
    },
    {
        name: 'Free with ads',
        children: [
            {name: 'All', route: 'ads/all'},
            {name: 'Movies', route: 'ads/movies'},
            {name: 'TV Shows', route: 'ads/shows'},
            {name: 'Sports', route: 'ads/sports'}
        ]
    },
    {
        name: 'Categories',
        children: [
            {
                name: 'Genre',
                children: [
                    {name: 'Action and Adventure'},
                    {name: 'Anime'},
                    {name: 'Comedy'},
                    {name: 'Documentary'},
                    {name: 'Drama'},
                    {name: 'Fantasy'},
                    {name: 'Horror'},
                    {name: 'International'},
                    {name: 'Kids'},
                    {name: 'Music Videos and Concerts'},
                    {name: 'Mystery and Thrillers'},
                    {name: 'Romance'},
                ]
            },
            {
                name: 'Featured Collections',
                children: [
                    {name: 'Culture Rated (Black voices)'},
                    {name: 'Hispanic & Latino voices'},
                    {name: 'Women Everyday'},
                    {name: 'Sports'},
                    {name: 'New Release Store'},
                    {name: 'Accessible Movies & TV'},
                ]
            }
        ]
    },
    {
        name: 'My Stuff',
        children: [
            {name: 'All', route: 'mystuff/all'},
            {name: 'Watchlist', route: 'mystuff/movies'},
            {name: 'Purchase & Rentals', route: 'mystuff/shows'}
        ]
    },
    
]