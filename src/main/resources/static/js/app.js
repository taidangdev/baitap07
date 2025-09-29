/**
 * Category Management Application JavaScript
 * Handles UI interactions, form validation, and dynamic behaviors
 */

class CategoryApp {
  constructor() {
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupFormValidation();
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.smoothScroll);
    });

    // Global click handler
    document.addEventListener('click', this.handleGlobalClick.bind(this));
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));

    // Form submission handlers
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
    });
  }

  /**
   * Initialize UI components
   */
  initializeComponents() {
    this.initializeSearch();
    this.initializeModals();
    this.initializeTables();
    this.initializeTooltips();
    this.initializeMobileMenu();
    this.initializeDropdowns();
    this.animateElements();
  }

  /**
   * Initialize search functionality
   */
  initializeSearch() {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    
    if (searchForm && searchInput) {
      // Auto-submit search after typing delay
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          if (e.target.value.length >= 2 || e.target.value.length === 0) {
            this.performSearch(e.target.value);
          }
        }, 500);
      });

      // Clear search button
      const clearButton = document.querySelector('#clear-search');
      if (clearButton) {
        clearButton.addEventListener('click', () => {
          searchInput.value = '';
          this.performSearch('');
        });
      }
    }
  }

  /**
   * Perform search operation
   */
  performSearch(keyword) {
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
      const keywordInput = searchForm.querySelector('input[name="keyword"]');
      if (keywordInput) {
        keywordInput.value = keyword;
        searchForm.submit();
      }
    }
  }

  /**
   * Initialize modal functionality
   */
  initializeModals() {
    // Delete confirmation modal
    const deleteLinks = document.querySelectorAll('.delete-confirm');
    deleteLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.showDeleteModal(link);
      });
    });

    // Modal close handlers
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.closeModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  /**
   * Show delete confirmation modal
   */
  showDeleteModal(deleteLink) {
    const categoryName = deleteLink.getAttribute('data-name');
    const deleteUrl = deleteLink.href;
    
    const modal = this.createModal({
      title: 'Xác nhận xóa',
      body: `Bạn có chắc chắn muốn xóa danh mục <strong>${categoryName}</strong>?<br>Hành động này không thể hoàn tác.`,
      actions: [
        {
          text: 'Hủy',
          class: 'btn-secondary',
          action: () => this.closeModal()
        },
        {
          text: 'Xóa',
          class: 'btn-danger',
          action: () => {
            window.location.href = deleteUrl;
          }
        }
      ]
    });
    
    this.showModal(modal);
  }

  /**
   * Create modal element
   */
  createModal({ title, body, actions }) {
    const modalHtml = `
      <div class="modal-overlay" id="dynamic-modal">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
          </div>
          <div class="modal-body">
            <p>${body}</p>
          </div>
          <div class="modal-footer">
            ${actions.map((action, index) => 
              `<button type="button" class="btn ${action.class}" data-action="${index}">${action.text}</button>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('dynamic-modal');
    
    // Add action listeners
    actions.forEach((action, index) => {
      const button = modal.querySelector(`[data-action="${index}"]`);
      if (button) {
        button.addEventListener('click', action.action);
      }
    });
    
    return modal;
  }

  /**
   * Show modal with animation
   */
  showModal(modal) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }

  /**
   * Close and remove modal
   */
  closeModal() {
    const modal = document.getElementById('dynamic-modal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 300);
    }
  }

  /**
   * Initialize table enhancements
   */
  initializeTables() {
    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
      // Add sorting capability
      const headers = table.querySelectorAll('th[data-sort]');
      headers.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => this.sortTable(table, header));
      });

      // Add row hover effects
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
          row.style.transform = 'scale(1.01)';
          row.style.transition = 'all 0.2s ease';
        });
        
        row.addEventListener('mouseleave', () => {
          row.style.transform = 'scale(1)';
        });
      });
    });
  }

  /**
   * Initialize mobile menu toggle
   */
  initializeMobileMenu() {
    const btn = document.querySelector('.mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }
  }

  /**
   * Initialize dropdown menus
   */
  initializeDropdowns() {
    // Settings dropdown
    const settingsBtn = document.querySelector('.settings-dropdown-btn');
    const settingsMenu = document.querySelector('.settings-dropdown-menu');
    
    if (settingsBtn && settingsMenu) {
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsMenu.classList.toggle('hidden');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
          settingsMenu.classList.add('hidden');
        }
      });
    }
  }

  /**
   * Initialize tooltips
   */
  initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', this.showTooltip);
      element.addEventListener('mouseleave', this.hideTooltip);
    });
  }

  /**
   * Show tooltip
   */
  showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      z-index: 1000;
      pointer-events: none;
      white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
    
    e.target.tooltip = tooltip;
  }

  /**
   * Hide tooltip
   */
  hideTooltip(e) {
    if (e.target.tooltip) {
      e.target.tooltip.remove();
      delete e.target.tooltip;
    }
  }

  /**
   * Animate elements on page load
   */
  animateElements() {
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });

    document.querySelectorAll('.card, .table-container').forEach(el => {
      animateOnScroll.observe(el);
    });
  }

  /**
   * Setup form validation
   */
  setupFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  /**
   * Validate individual field
   */
  validateField(field) {
    const value = field.value.trim();
    const errors = [];

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errors.push('Trường này là bắt buộc');
    }

    // Email validation
    if (field.type === 'email' && value && !this.isValidEmail(value)) {
      errors.push('Email không hợp lệ');
    }

    // Min length validation
    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
      errors.push(`Tối thiểu ${minLength} ký tự`);
    }

    // Max length validation
    const maxLength = field.getAttribute('maxlength');
    if (maxLength && value.length > parseInt(maxLength)) {
      errors.push(`Tối đa ${maxLength} ký tự`);
    }

    // Number validation
    if (field.type === 'number' && value && isNaN(value)) {
      errors.push('Vui lòng nhập số hợp lệ');
    }

    this.displayFieldErrors(field, errors);
    return errors.length === 0;
  }

  /**
   * Clear field errors
   */
  clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
    field.classList.remove('error');
  }

  /**
   * Display field errors
   */
  displayFieldErrors(field, errors) {
    this.clearFieldError(field);
    
    if (errors.length > 0) {
      field.classList.add('error');
      const errorElement = document.createElement('div');
      errorElement.className = 'field-error text-red-500 text-sm mt-1';
      errorElement.textContent = errors[0];
      field.parentElement.appendChild(errorElement);
    }
  }

  /**
   * Email validation helper
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Handle global clicks for dynamic interactions
   */
  handleGlobalClick(e) {
    // Handle loading states for buttons
    if (e.target.matches('.btn[data-loading]')) {
      this.addLoadingState(e.target);
    }

    // Handle copy to clipboard
    if (e.target.matches('[data-copy]')) {
      e.preventDefault();
      this.copyToClipboard(e.target.getAttribute('data-copy'));
    }
  }

  /**
   * Add loading state to button
   */
  addLoadingState(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Đang xử lý...';
    
    // Restore button after 2 seconds (fallback)
    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 5000);
  }

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification('Đã sao chép vào clipboard', 'success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      this.showNotification('Không thể sao chép', 'error');
    }
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type} fixed top-4 right-4 z-50 max-w-sm`;
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <span>${message}</span>
        <button class="ml-4 text-lg leading-none" onclick="this.parentElement.parentElement.remove()">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboardNavigation(e) {
    // Escape key handling
    if (e.key === 'Escape') {
      // Close any open modals
      this.closeModal();
      
      // Remove focus from current element
      document.activeElement.blur();
    }

    // Enter key on buttons
    if (e.key === 'Enter' && e.target.matches('button, .btn')) {
      e.target.click();
    }
  }

  /**
   * Handle form submissions
   */
  handleFormSubmit(e) {
    const form = e.target;
    
    // Only validate forms with data-validate attribute
    if (form.hasAttribute('data-validate')) {
      let isValid = true;
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        this.showNotification('Vui lòng kiểm tra lại thông tin', 'error');
        return false;
      }
    }
    
    // Add loading state to submit button
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitButton && !submitButton.classList.contains('btn-danger')) {
      this.addLoadingState(submitButton);
    }
  }

  /**
   * Smooth scroll functionality
   */
  smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Utility: Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Utility: Throttle function
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CategoryApp();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CategoryApp;
}