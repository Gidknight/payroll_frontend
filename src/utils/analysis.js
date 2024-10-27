import moment from 'moment'
import { convertDate, convertStringToDateTime, extractInner, sortObjectByValues } from '.'

const date = moment().toDate()
const CMonth = date.getMonth() + 1
const CYear = date.getFullYear()

export const getStaticAnalysis = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/analysis', {
    method: 'GET',
    cache: 'no-store'
  })
  const data = await response.json()

  return data
}

export const calculateInterest = (total = 1, interest = 1, payable_for = 1, start_date = '') => {
  const rate = (interest / 100) * total
  const end_payment = total + rate
  const min_payment = end_payment / payable_for

  const end_date = moment(start_date, 'YYYY-MM-DD').add(payable_for, 'weeks')

  return {
    end_payment,
    min_payment,
    end_date: end_date.toDate()
  }
}

export const uploadMini = async (user_id = '') => {
  if (!user_id) return
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/cron', {
    method: 'POST',
    body: JSON.stringify({ user_id })
  })
  const response = await res.json()
  return response
}

export const getWeekDaySales = (salesData = []) => {
  if (!salesData.length) return

  const week_day_sales = {}

  salesData.forEach((sale) => {
    const day = convertDate(sale.createdAt, false)
    const day_in_word = day.day_in_word
    // day_in_word.
    if (!week_day_sales.hasOwnProperty(day_in_word)) {
      week_day_sales[day_in_word] = [sale]

      // week_day_sales[day_in_word].push(sale);
    } else {
      week_day_sales[day_in_word].push(sale)
    }
  })

  return week_day_sales
}

export const getSalesAnalysis = (salesArray = [], currentYear = CYear) => {
  if (!salesArray.length) return
  let available_years = {}
  let weekly_obj = {}

  let gross_data = []
  let annual_data = []
  let week_data = []
  let current_week = []
  let gross_revenue = 0
  salesArray.forEach((sale) => {
    const year = sale.year

    // Check if the year already exists in the object
    if (!available_years[year]) {
      available_years[year] = []
      // available_years.monthly_sales = [];
    }

    // Add the sale to the array for the year
    available_years[year].push(sale)
    available_years[year].sort((a) => a.month)
    // console.log(`Year: ${year}, Sales:`, sales);
    gross_revenue += sale?.profit
  })

  for (const year in available_years) {
    if (available_years.hasOwnProperty(year)) {
      const sales = available_years[year]
      // console.log(`Year: ${year}, Sales:`, sales);
      let total = 0
      sales.forEach((obj) => (total = total + obj.profit))

      gross_data.push({ key: year, value: total })
    }
  }

  const products_sold = {}
  let annual_obj = {}
  const all_sellers = []

  if (!annual_data.length) {
    const current_year_sales = available_years[currentYear]

    let total = 0
    current_year_sales.forEach((sale) => {
      // console.log("sale=>", sale[4]);
      if (!all_sellers.length) {
        all_sellers.push({
          seller_id: sale.user_id,
          total_revenue: sale.profit,
          total_customers: sale.SalesDetails.length
        })
      }
      const seller_index = all_sellers.findIndex((user) => user?.seller_id == sale?.user_id)
      // console.log("seller index:", seller_index);
      if (seller_index < 0) {
        all_sellers.push({
          seller_id: sale.user_id,
          total_revenue: sale.profit,
          total_customers: sale.SalesDetails.length
        })
      } else {
        const seller = all_sellers[seller_index]

        const updated_seller = {
          seller_id: seller.seller_id,
          total_revenue: seller.total_revenue + sale.profit,
          total_customers: seller.total_customers + sale.SalesDetails.length
        }
        all_sellers[seller_index] = updated_seller
      }
      const extraction = extractInner(sale, 'SalesDetails', 'product_id')
      Object.keys(extraction).forEach((productName) => {
        if (products_sold.hasOwnProperty(productName)) {
          products_sold[productName] += extraction[productName]
        } else {
          products_sold[productName] = extraction[productName]
        }
      })

      const month = convertDate(sale.createdAt, false).month_in_word

      if (!annual_obj[month]) {
        annual_obj[month] = total + sale.profit
      } else {
        annual_obj[month] = annual_obj[month] + sale.profit
      }

      const day = convertDate(sale.createdAt, false).day_in_word

      if (!weekly_obj.hasOwnProperty(day)) {
        weekly_obj[day] = 1

        // weekly_obj[day].push(sale);
      } else {
        weekly_obj[day] += 1
      }
    })
  }

  all_sellers.sort((a, b) => b.total_revenue - a.total_revenue)
  const top_three_sellers = all_sellers.slice(0, 3)
  // console.log("all sellers=> ", all_sellers);

  const sorted_sold_product = sortObjectByValues(products_sold)

  return {
    gross_data,
    gross_revenue,
    monthly_sales: annual_obj,
    top_three_sellers,
    sales_by_day_of_week: weekly_obj,
    sorted_sold_product
  }
}

export const getInventoryAnalysis = (
  productsArray = [],
  stockArray = [],
  currentYear = CYear,
  currentMonth = CMonth
) => {
  if (!productsArray.length) return

  let total_stock = 0
  let low_stocks = 0
  let quantity_in_hand = 0
  productsArray.forEach((product) => {
    total_stock = total_stock + product.quantity * product.price
    quantity_in_hand += product.quantity
    if (product.quantity < product.low_threshold) {
      low_stocks = low_stocks + 1
    }
  })

  let net_stock = 0
  let month_addition = 0
  stockArray.forEach((stock) => {
    net_stock = net_stock + stock.quantity * stock.product.price
    const month = convertDate(stock.createdAt, false).month
    if (currentMonth === month) {
      month_addition = month_addition + stock.quantity
    }
  })

  return {
    current_stock_value: total_stock,
    low_stocks,
    quantity_in_hand,
    net_stock_value: net_stock,
    month_addition,
    gross_products: productsArray.length
  }
}

export const getTopsInfo = (
  top_products = {},
  top_sellers = [],
  all_products = [],
  all_sellers = []
) => {
  if (!top_products || !top_sellers.length || !all_products.length || !all_sellers.length) return

  const top_three_full = []

  top_sellers.forEach((seller) => {
    all_sellers.forEach((user) => {
      if (seller.seller_id === user.id) {
        top_three_full.push({
          ...seller,
          user_name: user?.username || user?.user_name,
          image_url: user.image_url,
          full_name: user?.full_name
        })
      }
    })
  })
  top_three_full.sort((a, b) => b.total_revenue - a.total_revenue)

  let top_sold_products = []
  for (let i = 0; i < all_products.length; i++) {
    // let product_id = Object.keys(sorted_sold_product[i]);
    if (top_products.hasOwnProperty(all_products[i].id)) {
      const product_id = all_products[i].id
      top_sold_products.push({
        id: product_id,
        name: all_products[i].name,
        category_name: all_products[i].category.name,
        image_url: all_products[i].image_url,
        quantity_sold: top_products[product_id]
      })
    }
  }

  top_sold_products.sort((a, b) => b.quantity_sold - a.quantity_sold)
  // console.log("test  =>", sorted_sold_product);
  // console.log("final  =>", top_sold_products);

  return { top_staffs: top_three_full, top_products: top_sold_products }
}

export const getCustomersAnalysis = (customersArray = []) => {
  if (!customersArray.length) return

  const creditors = []
  const goodCustomers = []
  customersArray.forEach((customer) => {
    const cus_obj = {
      id: customer.id,
      full_name: customer.last_name + ' ' + customer.first_name + ' ' + customer.other_name,
      contact: customer.contact,
      email: customer.email,
      address: customer.address,
      balance: customer.balance,
      debt: customer.debt,
      createdAt: customer.createdAt,
      salesRecord: customer?.Aggrement,
      paymentsRecord: customer?.Payment
    }
    if (parseFloat(customer.debt) > 0) {
      creditors.push(cus_obj)
    } else {
      goodCustomers.push(cus_obj)
    }
  })

  return { creditors, goodCustomers, total_customers: customersArray.length }
}
