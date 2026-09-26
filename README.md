# Haniya Proteins

HANIYA PROTEINS — CUSTOMER FRONTEND

Complete UI/UX + Functional Frontend Specification

Build a professional, modern, mobile-first chicken e-commerce customer website for Haniya Proteins.

This is the CUSTOMER FRONTEND ONLY.

There is NO ADMIN PANEL in this frontend.
The admin frontend will be developed separately by another team member.

The application must be structured so that it can later connect cleanly to a Spring Boot REST API + MySQL backend.

1. BRAND

Brand Name

HANIYA PROTEINS

Tagline

“Fresh Chicken, Made for Your Kitchen.”

Business Scope

Haniya Proteins sells chicken products only.

Do NOT include:

Mutton

Beef

Fish

Seafood

Eggs

Vegetables

Generic protein products

The entire UI, product data, categories, search and content should focus specifically on chicken.

2. BRAND VISUAL DIRECTION

Use the provided Haniya Proteins logo as the main brand identity.

The logo will be uploaded separately as an image/reference.

The UI should feel:

Professional

Fresh

Modern

Trustworthy

Premium

Food-commerce focused

Clean

Fast

Practical

Mobile-friendly

The logo can have a playful personality, but the overall website must NOT look childish.

Do not make the website look like a cartoon website.

Do not use excessive:

Glassmorphism

Floating cards

Gradients

Neon effects

Huge rounded containers

Decorative animations

Excessive shadows

Orange-heavy colors

The website should feel like a real commercial food-ordering platform.

3. COLOR SYSTEM

Use a brand palette inspired by the Haniya logo.

Primary direction:

Red — primary brand/accent color

Charcoal / deep neutral — text and dark surfaces

Off-white / warm white — light background

Neutral grays for secondary content

Avoid making the website predominantly orange.

Red should remain recognizable as the primary brand accent.

4. LIGHT + DARK MODE

Include a Light/Dark theme toggle.

Light Mode

Use:

Off-white background

Charcoal text

Red accent

Soft neutral borders

Clean white product surfaces

Dark Mode

Use:

Deep charcoal / near-black background

Off-white text

Same red brand accent

Dark neutral surfaces

Subtle borders

The dark mode should feel like the same Haniya Proteins brand, not like a completely different website.

Persist the selected theme.

5. MOBILE-FIRST REQUIREMENT

Design primarily for:

360px

375px

390px

412px

Then make the interface responsive for:

Tablet

Laptop

Desktop

The mobile experience is the priority.

Everything must remain usable without horizontal scrolling.

Use comfortable touch targets.

6. FIRST SCREEN — LOGIN

When the website is opened, the first screen must be the Login page.

Do not immediately open the shopping homepage.

However, the user must have a clear option to:

“Continue without login”

This should appear prominently at the top-right.

7. LOGIN PAGE — MOBILE

Mobile login layout:

Haniya logo

HANIYA PROTEINS

Tagline:

“Fresh Chicken, Made for Your Kitchen.”

Login form

Continue without login

The logo should be centered and clearly visible.

Keep the page clean and professional.

Do not make the login page overly decorative.

8. LOGIN PAGE — DESKTOP

Use a split-screen layout.

Left Side

Display:

Haniya logo

HANIYA PROTEINS

Tagline

Subtle professional brand imagery/visual treatment

Right Side

Display:

Login form

Forgot Password

Login with OTP

Register

Top-right:

Continue without login

The desktop layout should feel premium and balanced.

9. LOGIN FORM

Support:

Login using

Mobile Number

Email

Password

Include:

Login button

Forgot Password

Login with OTP

Register

Example:

Mobile / Email
Password

[ LOGIN ]

Forgot Password?

[ LOGIN WITH OTP ]

Don't have an account? Register

10. OTP LOGIN

Provide a separate OTP authentication flow.

Steps:

Enter mobile number

Send OTP

OTP verification screen

Resend OTP

Countdown timer

Verify OTP

Successful authentication

Include proper states:

Sending OTP

Invalid OTP

Expired OTP

Resend OTP

Network error

Verification success

OTP verification must eventually be connected to the backend.

Do not hardcode real OTP logic in the frontend.

11. REGISTER

Registration fields:

Full Name

Mobile Number

Email

Password

Confirm Password

Button:

CREATE ACCOUNT

After registration:

OTP verification must be required.

Flow:

Register → OTP Verification → Account Created → Continue Shopping

Validate:

Required fields

Valid phone number

Valid email

Password strength

Password confirmation

Duplicate phone/email from backend

12. GUEST SHOPPING — CRITICAL UX RULE

DO NOT FORCE LOGIN WHILE SHOPPING.

A guest user must be allowed to freely explore the website.

Guest users can:

Browse products

Search products

Open product details

Select weight

Select quantity

Add products to cart

View cart

Edit cart

Remove products

Proceed to checkout

Enter/select delivery address

Choose delivery or pickup

Choose payment method

Review the order

DO NOT require login at:

Add to Cart

View Cart

Checkout

Address selection

Payment selection

The guest should only be asked to authenticate at the final action:

“PLACE ORDER”

This is a strict UX requirement.

Do not add unnecessary login popups during shopping.

13. PLACE ORDER AUTHENTICATION

When a guest clicks:

PLACE ORDER

Show:

“Login before placing your order.”

Provide:

LOGIN

LOGIN WITH OTP

REGISTER

The authentication screen should feel like a continuation of checkout, not like the customer has been thrown back to the beginning.

14. PRESERVE GUEST CHECKOUT STATE

This is extremely important.

When a guest is asked to authenticate at Place Order, preserve:

Cart items

Product quantities

Selected weights

Cart total

Delivery address

Selected saved address

Delivery/pickup selection

Payment method

Checkout information

Any applicable offer/discount

Current checkout state

After successful authentication:

Return the customer to the SAME checkout state.

The customer should NOT have to:

Rebuild the cart

Select products again

Re-enter the address unnecessarily

Restart checkout

After authentication, the user can continue directly toward order placement.

15. CORE UX PRINCIPLE

The website must follow this principle:

“Let customers shop first. Ask them to authenticate only when they are ready to place the order.”

The purpose is to provide the security required for placing an order without creating unnecessary friction during shopping.

16. HEADER — MOBILE

Create a compact mobile header containing:

Haniya logo

Location

Cart icon

Profile icon

Keep it clean.

Do not make the header oversized.

17. BOTTOM NAVIGATION — MOBILE

Use a fixed bottom navigation bar:

Home | Products | Orders | Profile

Highlight the current section.

The design should remain professional and lightweight.

The sticky cart bar must appear above this navigation when active.

18. HOME PAGE

Home page structure:

Header

Location

Search

Hero

Chicken Categories

Popular Chicken

All Chicken Products

Offers

Freshness / Halal

About

Contact

Footer

Do not make the hero so large that customers have to scroll excessively before seeing products.

19. LOCATION

Display the customer's selected delivery location near the top.

Example:

Deliver to
Nagercoil

Allow the user to change it.

Clicking the location should open the address/location interface.

20. SEARCH

Search placeholder:

“Search chicken cuts...”

Search should support:

Product name

Chicken category

Weight

Relevant keywords

Include:

Search suggestions

Clear button

No-result state

Instant filtering

The search bar can become sticky while scrolling if it improves usability.

21. HERO SECTION

Use professional, high-quality chicken photography.

Headline:

Fresh Chicken, Made for Your Kitchen.

Supporting text should be short and practical.

CTA:

SHOP CHICKEN

Do not make the hero cartoonish.

Do not use excessive animation.

Use subtle movement only if it improves the experience.

22. CHICKEN CATEGORIES

Use a horizontal swipeable category selector.

Categories:

All

Whole

Breast

Thigh

Wings

Legs

Boneless

Do NOT create huge category cards.

Use compact chips/tabs/buttons.

23. PRODUCT DATA — MOCK DATA

Create centralized mock data that can later be replaced by API responses.

Chicken Breast

500g — ₹240
1kg — ₹450

Chicken Thigh

500g — ₹220
1kg — ₹420

Chicken Wings

500g — ₹200
1kg — ₹380

Chicken Drumsticks

500g — ₹210
1kg — ₹400

Whole Chicken

1kg — ₹260
1.5kg — ₹390
2kg — ₹510

Chicken Boneless

500g — ₹280
1kg — ₹530

These are mock prices only.

Keep product data centralized.

Do not scatter hardcoded product data across components.

24. PRODUCT CARD DESIGN

Product cards should be:

Compact

Professional

Mobile-friendly

Easy to scan

Each product should show:

Product image

Product name

Short description

Weight

Price

Availability

Add button

Example:

Chicken Breast

Fresh boneless breast cut

500g
₹240

[ ADD ]

After adding:

[ − ] 1 [ + ]

Do not create giant colorful cards.

25. ADD TO CART MICROINTERACTION

When the user adds a product:

Quantity updates immediately

Product button changes from ADD to quantity controls

Cart count updates

Cart total updates

Sticky cart bar appears

Use a subtle animation

The animation should feel smooth and fast.

26. STICKY BOTTOM CART BAR

When the cart contains at least one item, show a sticky bottom cart bar.

This should appear above the mobile bottom navigation.

It should:

Slide up smoothly

Show item count

Show total

Include VIEW CART

Update instantly

Disappear when cart becomes empty

Example:

3 Items · ₹780

[ VIEW CART ]

Do not let it cover important content.

27. PRODUCT DETAILS PAGE

When opening a product:

Display:

Large product image

Product name

Category

Description

HALAL indicator

Weight selector

Price

Availability

Quantity selector

Add to Cart

Buy Now

Use:

حلال

and

HALAL

for the halal indicator.

Do not invent certification claims.

28. CART PAGE

Display:

Cart items

Product image

Product name

Selected weight

Price

Quantity controls

Remove button

Summary:

Subtotal

Delivery fee

Discount

Total

Primary action:

PROCEED TO CHECKOUT

On mobile, a sticky checkout action may be used.

29. EMPTY CART

Message:

“Your cart is waiting for something fresh.”

CTA:

SHOP CHICKEN

Keep the empty state simple and professional.

30. CHECKOUT

Checkout should include:

Customer information

Name

Mobile number

Delivery address

Saved address

Add new address

Edit address

Delivery method

Home Delivery

Pickup

Payment

UPI

Card

COD

Order summary

Products

Quantities

Subtotal

Delivery fee

Discount

Final total

Final button:

PLACE ORDER

Remember:

A guest is allowed to reach this page.

Login is required only when Place Order is clicked.

31. GOOGLE MAPS / ADDRESS SYSTEM

Integrate Google Maps.

Allow users to:

Use Current Location

Request GPS permission only when the user chooses to use current location.

Do NOT continuously track the user's location.

Search Address

Use Google Places/address search.

Choose on Map

Allow the user to:

Open map

Select location

Drag pin

Confirm location

After selecting a location, collect:

House / Flat / Door No.

Street / Road

Area / Locality

City

State

Pincode

Landmark

Address Label

Address labels:

Home

Work

Other

Store:

Latitude

Longitude

Formatted address

32. SAVED ADDRESSES

Authenticated users should be able to:

Add address

Edit address

Delete address

Set default address

Select saved address

Backend should validate delivery availability.

The frontend should be ready to consume a backend delivery-zone API.

33. GOOGLE MAPS SECURITY

Use frontend-restricted Google Maps API keys.

Use environment variables.

Never expose privileged backend/server keys.

Example architecture:

Frontend → restricted Maps key

Backend → secure server-side services where required

Do not hardcode secret keys into source code.

34. DELIVERY AVAILABILITY

Before final order placement, backend should determine whether the selected address is serviceable.

Possible states:

Delivery available

Delivery unavailable

Service temporarily unavailable

Location validation failed

Show clear messages.

Do not make fake frontend-only delivery availability decisions.

35. PAYMENT

Support these payment methods:

UPI

Provide UPI payment flow.

On supported mobile devices:

UPI app/deep-link

On web:

UPI QR

The QR must eventually be generated from a real payment gateway/order transaction.

Do NOT hardcode a fake production QR code.

Card

Support card payment through a real payment gateway.

COD

Cash on Delivery.

36. PAYMENT SECURITY

Payment should eventually use a real payment gateway such as Razorpay or another appropriate provider.

Frontend must NOT contain:

Payment secrets

Secret API keys

Signature secrets

Payment flow:

Frontend → Backend → Payment Gateway

Backend verifies payment.

Never assume payment succeeded merely because the frontend returned from a payment screen.

37. PAYMENT STATES

Handle:

Processing

Success

Failure

Cancelled

Pending

Retry

Each state should have a clear UI.

38. ORDER CONFIRMATION

After successful order placement:

Display:

Order Placed Successfully

Show:

Order ID

Products

Quantities

Total

Payment method

Delivery address

Delivery information

Actions:

VIEW ORDER

CONTINUE SHOPPING

39. ORDER TRACKING

Show order progress:

Order Placed
↓
Confirmed
↓
Preparing
↓
Out for Delivery
↓
Delivered

Also support:

Cancelled

Use clean progress indicators.

40. MY ORDERS

Orders page should display:

Order ID

Date

Items

Total

Status

Allow opening an order detail page.

Order detail should include:

Products

Quantities

Prices

Total

Address

Payment method

Order status

Delivery status

41. PROFILE

Profile page should contain:

Personal Information

Name

Phone

Email

Saved Addresses

My Orders

Notifications

Theme

Help & Support

Privacy

Terms

Logout

Keep the layout clean.

Do not copy any provided reference screenshot directly.

42. OFFERS

Include an Offers section.

Use mock offers initially.

Examples can be:

First order offer

Selected chicken cuts

Limited-time discounts

Keep offer data centralized so the backend/admin can later manage it.

Do not hardcode offers throughout the UI.

43. FRESHNESS / HALAL SECTION

Include a small trust-focused section.

Use wording such as:

FRESH CHICKEN

حلال

HALAL

Do not invent:

Government certifications

Food safety certifications

Unverified claims

Business history

Delivery guarantees

Until the client provides the real information.

44. ABOUT SECTION

Keep the About section professional.

Do not invent company history.

Use placeholder content where the client has not provided actual business information.

The structure should make it easy to replace placeholder text later.

45. CONTACT

Include a professional Contact section.

Allow future backend/admin configuration for:

Phone

Email

Address

Business hours

Social links

Do not invent real contact details.

46. FOOTER

Footer can include:

Haniya Proteins

Tagline

Quick links

Products

Orders

Contact

Privacy

Terms

Social links

Copyright

Keep it clean.

47. SMOOTH SCROLLING + ANIMATIONS

Use smooth scrolling.

Animations should be:

Subtle

Fast

Natural

Professional

Use animations for:

Section entrance

Product appearance

Add-to-cart interaction

Sticky cart appearance

Page transitions

Modal transitions

Theme transition where appropriate

Avoid:

Excessive parallax

Constant floating objects

Long loading animations

Overly cinematic transitions

Animations that slow shopping

Performance and usability come first.

48. LOADING STATES

Create proper skeleton/loading states for:

Products

Product images

Categories

Orders

Profile

Addresses

Location

Google Maps

Checkout

Payment

Avoid blank screens.

49. EMPTY STATES

Empty cart

Your cart is waiting for something fresh.

[ SHOP CHICKEN ]

No orders

No orders yet.

[ START SHOPPING ]

No search results

No chicken cuts found.

Try another search.

50. ERROR STATES

Handle errors professionally.

Examples:

Invalid login

Incorrect password

Invalid OTP

Expired OTP

Registration failure

Network error

Product unavailable

Location permission denied

Address unavailable

Payment failed

Payment cancelled

Order placement failed

Server unavailable

Do not use generic unexplained error messages.

Provide useful recovery actions.

51. ACCESSIBILITY

Follow accessibility best practices.

Include:

Proper labels

Keyboard navigation

Visible focus states

Good color contrast

Screen-reader-friendly controls

Touch-friendly buttons

Semantic HTML

Accessible forms

Accessible error messages

Do not rely only on color to communicate status.

52. PERFORMANCE

Optimize for real-world mobile users.

Use:

Optimized images

Lazy loading

Efficient rendering

Minimal unnecessary re-renders

Lightweight animations

Proper caching where appropriate

Responsive image sizes

The website should feel fast.

53. FRONTEND TECHNOLOGY

Use:

React

Vite

JavaScript / JSX

Do NOT use TypeScript unless explicitly requested later.

Use:

React Router

Component-based architecture

Modern CSS

Reusable components

Context/hooks where appropriate

54. SUGGESTED PROJECT STRUCTURE

Use a clean structure such as:

src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── context/
├── utils/
├── assets/
├── data/
├── styles/
└── App.jsx


Suggested pages:

Login
Register
OTP Verification
Home
Products
Product Details
Cart
Checkout
Order Success
Order Details
Orders
Profile
Addresses
Offers
Contact


55. API-READY ARCHITECTURE

Do not tightly couple UI components to mock data.

Create service layers such as:

services/
├── authService.js
├── productService.js
├── categoryService.js
├── cartService.js
├── customerService.js
├── addressService.js
├── orderService.js
├── offerService.js
├── locationService.js
└── paymentService.js


API calls should be kept outside UI components.

Initially these services can use mock data.

Later they will connect to Spring Boot REST APIs.

56. BACKEND-READY API EXAMPLES

Structure the frontend so it can later consume APIs such as:

/api/auth
/api/products
/api/categories
/api/cart
/api/customers
/api/addresses
/api/orders
/api/offers
/api/payments
/api/location


Example:

GET    /api/products
GET    /api/categories
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/send-otp
POST   /api/auth/verify-otp
POST   /api/orders
GET    /api/orders
GET    /api/orders/{id}
POST   /api/addresses
PUT    /api/addresses/{id}
DELETE /api/addresses/{id}


These are architectural examples. The final API contract will be decided jointly with the backend.

57. DATA MODELS — FRONTEND AWARENESS

The frontend should be designed around data structures that can later map to the backend.

Product

id
name
categoryId
description
images
variants
availability
featured
popular
halal
active


Product Variant

id
productId
weight
price
stock


Customer

id
name
mobile
email
addresses


Address

id
customerId
label
house
street
area
city
state
pincode
landmark
latitude
longitude
formattedAddress


Order

id
customerId
items
addressId
paymentMethod
deliveryMethod
status
total


58. CART STATE

The cart should work for both:

Guest

and

Authenticated user

Guest cart should persist during the browsing session.

When the guest authenticates, merge/preserve the cart appropriately instead of unexpectedly clearing it.

The customer must never lose their cart because they were asked to log in.

59. AUTHENTICATION STATE

Clearly distinguish:

Guest

Can:

Browse

Search

Add to cart

Checkout

Enter address

Select payment

Reach Place Order

Cannot:

Complete order without authentication

Authenticated Customer

Can:

Everything a guest can do

Place orders

View order history

Manage saved addresses

Manage profile

Receive account-specific information

60. REFERENCE SCREENSHOTS

The user may provide:

Food delivery app home screenshots

Cart reference screenshot

Profile/settings screenshot

Use these only as UX inspiration.

Do NOT copy:

Exact layout

Exact styling

Exact colors

Exact icons

Exact wording

Exact visual design

Create an original Haniya Proteins interface.

Take inspiration from useful interaction patterns, especially:

Search

Product browsing

Cart behavior

Navigation

Checkout flow

But the final UI must have its own identity.

61. DESIGN QUALITY

The final website should feel like a real production-ready food commerce product, not a college demo.

Prioritize:

Usability

Mobile experience

Clear product discovery

Fast shopping

Trust

Checkout simplicity

Professional visual design

Accessibility

Performance

The interface should not be overloaded with decorative elements.

62. IMPORTANT — DO NOT BREAK THESE RULES

NEVER:

Force login when adding to cart

Force login when opening cart

Force login when entering checkout

Clear a guest cart when authentication is requested

Redirect the user back to the homepage after authentication

Make the user repeat checkout unnecessarily

Add admin functionality

Add unrelated products

Use fake production payment logic

Expose secret API keys

Invent business claims

Invent certifications

Create an orange-heavy childish design

Overuse glassmorphism

Overuse cards

Make the UI overly animated

Copy reference screenshots exactly

ALWAYS:

Let guests shop freely

Ask for authentication only at Place Order

Preserve checkout state

Return authenticated users to checkout

Keep the design mobile-first

Use the Haniya brand identity

Keep red as the primary accent

Support light/dark mode

Make the UI API-ready

Keep mock data centralized

Build reusable components

Handle loading/empty/error states

Keep payment verification backend-controlled

Make Google Maps integration secure

Keep the experience fast and professional

63. FINAL USER JOURNEY

The ideal customer journey should be:

OPEN WEBSITE
      ↓
LOGIN PAGE
      ↓
Continue without login
      ↓
HOME
      ↓
SEARCH / BROWSE CHICKEN
      ↓
PRODUCT
      ↓
SELECT WEIGHT
      ↓
ADD TO CART
      ↓
STICKY CART BAR
      ↓
VIEW CART
      ↓
CHECKOUT
      ↓
SELECT / ENTER ADDRESS
      ↓
SELECT DELIVERY / PICKUP
      ↓
SELECT PAYMENT
      ↓
PLACE ORDER
      ↓
IF GUEST
      ↓
"LOGIN BEFORE PLACING YOUR ORDER"
      ↓
LOGIN / OTP / REGISTER
      ↓
RETURN TO SAME CHECKOUT
      ↓
PLACE ORDER
      ↓
PAYMENT
      ↓
BACKEND VERIFICATION
      ↓
ORDER SUCCESS
      ↓
ORDER TRACKING


For an already authenticated customer:

OPEN
 ↓
LOGIN
 ↓
HOME
 ↓
SHOP
 ↓
CART
 ↓
CHECKOUT
 ↓
PLACE ORDER
 ↓
PAYMENT
 ↓
ORDER SUCCESS


64. FINAL DESIGN GOAL

Create a mobile-first, professional, trustworthy chicken shopping experience for Haniya Proteins.

The customer should immediately understand:

What Haniya Proteins sells

What chicken cuts are available

How much they cost

How to add them to cart

How to choose delivery

How to pay

How to track the order

The website should feel:

Fresh. Simple. Professional. Fast. Trustworthy.

The playful Haniya logo can provide personality, but the actual shopping experience should remain mature and production-quality.

MOST IMPORTANT UX RULE

Let the customer shop freely as a guest. Do not interrupt them with authentication during browsing, Add to Cart, Cart, or Checkout. Authenticate only when they click Place Order, then preserve their entire checkout state and return them to the same point after successful authentication.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b646a27c-8013-4a42-b6c9-666db9ea6ecb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
