document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const toolCards = document.querySelectorAll('.tool-card');
    const categories = document.querySelectorAll('.category');

    // 搜索功能
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 如果搜索框为空，显示所有工具
            toolCards.forEach(card => {
                card.style.display = 'flex';
            });
            
            // 显示所有分类
            categories.forEach(category => {
                category.style.display = 'block';
            });
            return;
        }
        
        // 隐藏所有分类，之后根据搜索结果再显示相关分类
        categories.forEach(category => {
            category.style.display = 'none';
        });
        
        // 过滤匹配的工具卡片
        toolCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();
            
            if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
                card.style.display = 'flex';
                // 显示该卡片所在的分类
                const parentCategory = card.closest('.category');
                parentCategory.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // 检查每个分类中是否有显示的卡片，如果没有则隐藏整个分类
        categories.forEach(category => {
            const visibleCards = category.querySelectorAll('.tool-card[style="display: flex;"]');
            if (visibleCards.length === 0 && !category.querySelector('.empty-category')) {
                category.style.display = 'none';
            }
        });
    }

    // 绑定搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);
    
    // 绑定回车键搜索事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 绑定输入框内容变化事件，实时搜索
    searchInput.addEventListener('input', function() {
        performSearch();
    });
}); 