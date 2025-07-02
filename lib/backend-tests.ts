import { apiClient } from '@/lib/api-client'

// Test configuration
const TEST_USER = {
  email: 'test@example.com',
  password: 'testpassword123',
  first_name: 'Test',
  last_name: 'User'
}

const TEST_PRODUCT = {
  handle: 'premium-hammock-1',
  id: 'test-product-id'
}

// Test utilities
function log(message: string, data?: any) {
  console.log(`[Backend Test] ${message}`, data || '')
}

function logError(message: string, error: any) {
  console.error(`[Backend Test ERROR] ${message}`, error)
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Test functions
export async function testAuth() {
  log('Testing Authentication...')
  
  try {
    // Test registration
    log('Testing user registration...')
    const registerResponse = await apiClient.register(TEST_USER)
    log('Registration response:', registerResponse)
    
    // Test login
    log('Testing user login...')
    const loginResponse = await apiClient.login({
      email: TEST_USER.email,
      password: TEST_USER.password
    })
    log('Login response:', loginResponse)
    
    // Test profile fetch
    log('Testing profile fetch...')
    const profileResponse = await apiClient.getProfile()
    log('Profile response:', profileResponse)
    
    // Test logout
    log('Testing logout...')
    const logoutResponse = await apiClient.logout()
    log('Logout response:', logoutResponse)
    
    return true
  } catch (error) {
    logError('Auth test failed:', error)
    return false
  }
}

export async function testProducts() {
  log('Testing Products API...')
  
  try {
    // Test get all products
    log('Testing get all products...')
    const productsResponse = await apiClient.getProducts()
    log('Products response:', productsResponse)
    
    // Test get products with filters
    log('Testing get products with filters...')
    const filteredResponse = await apiClient.getProducts({
      category: 'hammocks',
      limit: 5
    })
    log('Filtered products response:', filteredResponse)
    
    // Test get single product
    log('Testing get single product...')
    const productResponse = await apiClient.getProduct(TEST_PRODUCT.handle)
    log('Product response:', productResponse)
    
    // Test get related products
    log('Testing get related products...')
    const relatedResponse = await apiClient.getRelatedProducts(TEST_PRODUCT.handle)
    log('Related products response:', relatedResponse)
    
    return true
  } catch (error) {
    logError('Products test failed:', error)
    return false
  }
}

export async function testCart() {
  log('Testing Cart API...')
  
  try {
    // Test get cart
    log('Testing get cart...')
    const cartResponse = await apiClient.getCart()
    log('Cart response:', cartResponse)
    
    // Test add to cart
    log('Testing add to cart...')
    const addResponse = await apiClient.addToCart({
      product_id: TEST_PRODUCT.id,
      quantity: 2
    })
    log('Add to cart response:', addResponse)
    
    // Get cart again to see the item
    const updatedCartResponse = await apiClient.getCart()
    log('Updated cart response:', updatedCartResponse)
    
    if (updatedCartResponse.success && updatedCartResponse.data?.items?.length > 0) {
      const itemId = updatedCartResponse.data.items[0].id
      
      // Test update cart item
      log('Testing update cart item...')
      const updateResponse = await apiClient.updateCartItem(itemId, { quantity: 1 })
      log('Update cart response:', updateResponse)
      
      // Test remove from cart
      log('Testing remove from cart...')
      const removeResponse = await apiClient.removeFromCart(itemId)
      log('Remove from cart response:', removeResponse)
    }
    
    return true
  } catch (error) {
    logError('Cart test failed:', error)
    return false
  }
}

export async function testWishlist() {
  log('Testing Wishlist API...')
  
  try {
    // Login first (wishlist requires auth)
    await apiClient.login({
      email: TEST_USER.email,
      password: TEST_USER.password
    })
    
    // Test get wishlist
    log('Testing get wishlist...')
    const wishlistResponse = await apiClient.getWishlist()
    log('Wishlist response:', wishlistResponse)
    
    // Test add to wishlist
    log('Testing add to wishlist...')
    const addResponse = await apiClient.addToWishlist({
      product_id: TEST_PRODUCT.id
    })
    log('Add to wishlist response:', addResponse)
    
    // Test remove from wishlist
    log('Testing remove from wishlist...')
    const removeResponse = await apiClient.removeFromWishlist(TEST_PRODUCT.id)
    log('Remove from wishlist response:', removeResponse)
    
    return true
  } catch (error) {
    logError('Wishlist test failed:', error)
    return false
  }
}

export async function testOrders() {
  log('Testing Orders API...')
  
  try {
    // Login first (orders require auth)
    await apiClient.login({
      email: TEST_USER.email,
      password: TEST_USER.password
    })
    
    // Test get orders
    log('Testing get orders...')
    const ordersResponse = await apiClient.getOrders()
    log('Orders response:', ordersResponse)
    
    // Test create order (simplified)
    log('Testing create order...')
    const orderData = {
      user_id: 'test-user-id',
      total_amount: 199.99,
      shipping_address: {
        first_name: 'Test',
        last_name: 'User',
        address1: '123 Test St',
        city: 'Test City',
        province: 'Test State',
        zip: '12345',
        country: 'US'
      },
      billing_address: {
        first_name: 'Test',
        last_name: 'User',
        address1: '123 Test St',
        city: 'Test City',
        province: 'Test State',
        zip: '12345',
        country: 'US'
      },
      payment_method: 'credit_card',
      items: [{
        product_id: TEST_PRODUCT.id,
        quantity: 1,
        price: 199.99,
        title: 'Test Product'
      }]
    }
    
    const createResponse = await apiClient.createOrder(orderData)
    log('Create order response:', createResponse)
    
    return true
  } catch (error) {
    logError('Orders test failed:', error)
    return false
  }
}

export async function testBlog() {
  log('Testing Blog API...')
  
  try {
    // Test get blog posts
    log('Testing get blog posts...')
    const postsResponse = await apiClient.getBlogPosts()
    log('Blog posts response:', postsResponse)
    
    // Test get blog posts with filters
    log('Testing get blog posts with search...')
    const searchResponse = await apiClient.getBlogPosts({
      search: 'hammock',
      limit: 5
    })
    log('Blog posts search response:', searchResponse)
    
    return true
  } catch (error) {
    logError('Blog test failed:', error)
    return false
  }
}

export async function testContact() {
  log('Testing Contact API...')
  
  try {
    // Test contact form submission
    log('Testing contact form submission...')
    const contactResponse = await apiClient.submitContactForm({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message from the backend test suite.'
    })
    log('Contact form response:', contactResponse)
    
    return true
  } catch (error) {
    logError('Contact test failed:', error)
    return false
  }
}

// Main test runner
export async function runAllTests() {
  log('Starting Backend API Tests...')
  
  const results = {
    auth: false,
    products: false,
    cart: false,
    wishlist: false,
    orders: false,
    blog: false,
    contact: false
  }
  
  // Run tests sequentially with delays
  results.auth = await testAuth()
  await delay(1000)
  
  results.products = await testProducts()
  await delay(1000)
  
  results.cart = await testCart()
  await delay(1000)
  
  results.wishlist = await testWishlist()
  await delay(1000)
  
  results.orders = await testOrders()
  await delay(1000)
  
  results.blog = await testBlog()
  await delay(1000)
  
  results.contact = await testContact()
  
  // Summary
  log('Test Results Summary:')
  Object.entries(results).forEach(([test, passed]) => {
    log(`${test.toUpperCase()}: ${passed ? 'PASSED' : 'FAILED'}`)
  })
  
  const passedCount = Object.values(results).filter(Boolean).length
  const totalCount = Object.keys(results).length
  
  log(`Overall: ${passedCount}/${totalCount} tests passed`)
  
  return results
}

// Expose for manual testing in browser console
if (typeof window !== 'undefined') {
  (window as any).backendTests = {
    runAllTests,
    testAuth,
    testProducts,
    testCart,
    testWishlist,
    testOrders,
    testBlog,
    testContact
  }
}
