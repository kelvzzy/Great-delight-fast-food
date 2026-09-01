# Requirements Document: Send to Friend Gift Order System

## Introduction

The Send to Friend Gift Order System enables customers to purchase food orders and send them as gifts to friends or family members via WhatsApp. Recipients receive a unique claim code and can redeem their gift order at the restaurant. The system tracks gift status, supports personalized messages, and provides administrative oversight of all gift transactions.

This feature addresses the use case where customers want to treat someone who is not physically present, enabling remote gifting through the existing ordering system with minimal friction.

## Glossary

- **Gift_Order**: An order marked as a gift with sender/recipient information and a unique claim code
- **Claim_Code**: A cryptographically secure unique identifier used by recipients to view and claim their gift order
- **Sender**: The customer who purchases and sends the gift order
- **Recipient**: The person who receives the gift order via WhatsApp
- **Gift_Status**: The state of a gift order (unclaimed or claimed)
- **WhatsApp_Share**: The mechanism for transmitting gift details to the recipient via WhatsApp deep link
- **Order_System**: The existing digital ordering platform
- **Admin_Dashboard**: The administrative interface for managing orders and viewing gift order status
- **Database_Migration**: The process of modifying database schema to add gift order fields
- **Local_Testing**: Testing database schema changes in development environment before production deployment

## Requirements

### Requirement 1: Gift Order Creation

**User Story:** As a customer, I want to mark my order as a gift during checkout, so that I can send food to a friend or family member.

#### Acceptance Criteria

1. WHEN a customer is on the checkout page, THE Order_System SHALL display a gift order option
2. WHEN a customer selects the gift option, THE Order_System SHALL prompt for sender name, sender phone, recipient name, and recipient phone
3. WHEN a customer selects the gift option, THE Order_System SHALL provide a text field for an optional personal gift message
4. WHEN gift details are submitted, THE Order_System SHALL validate that all required fields are non-empty
5. WHEN gift details are submitted with valid data, THE Order_System SHALL accept the gift order for processing

### Requirement 2: Claim Code Generation

**User Story:** As a system administrator, I want each gift order to have a unique claim code, so that recipients can securely identify and claim their gifts.

#### Acceptance Criteria

1. WHEN a gift order is created, THE Order_System SHALL generate a cryptographically secure random claim code
2. THE Order_System SHALL ensure claim codes are at least 8 characters long
3. THE Order_System SHALL ensure claim codes contain alphanumeric characters only
4. WHEN generating a claim code, THE Order_System SHALL verify the code is unique across all gift orders
5. IF a generated claim code already exists, THEN THE Order_System SHALL generate a new code until a unique code is found

### Requirement 3: Gift Order Data Storage

**User Story:** As a system administrator, I want gift order information stored in the database, so that the system can track and manage gift orders.

#### Acceptance Criteria

1. THE Order_System SHALL store the following fields for gift orders: isGift, giftSenderName, giftSenderPhone, giftRecipientName, giftRecipientPhone, giftMessage, giftClaimCode, giftClaimed, giftClaimedAt
2. WHEN an order is not a gift, THE Order_System SHALL set isGift to false and leave all gift-related fields null
3. WHEN a gift order is created, THE Order_System SHALL set isGift to true and populate sender, recipient, message, and claim code fields
4. WHEN a gift order is created, THE Order_System SHALL set giftClaimed to false and giftClaimedAt to null
5. THE Order_System SHALL ensure giftClaimCode is unique and indexed for fast lookup

### Requirement 4: WhatsApp Share Functionality

**User Story:** As a customer, I want to share gift order details via WhatsApp, so that the recipient receives the gift information and claim code.

#### Acceptance Criteria

1. WHEN a gift order is successfully created, THE Order_System SHALL display a WhatsApp share button
2. WHEN the WhatsApp share button is clicked, THE Order_System SHALL generate a WhatsApp deep link with pre-filled message content
3. THE WhatsApp_Share message SHALL include sender name, recipient name, list of ordered items, gift message, claim code, and restaurant branch location
4. WHEN the WhatsApp deep link is opened on mobile, THE Order_System SHALL open the WhatsApp application with the pre-filled message
5. WHEN the WhatsApp deep link is opened on desktop, THE Order_System SHALL open WhatsApp Web with the pre-filled message

### Requirement 5: Gift Order Viewing by Claim Code

**User Story:** As a recipient, I want to view my gift order details using the claim code, so that I know what has been sent to me and where to claim it.

#### Acceptance Criteria

1. THE Order_System SHALL provide an API endpoint that accepts a claim code and returns gift order details
2. WHEN a valid claim code is submitted, THE Order_System SHALL return sender name, recipient name, ordered items with quantities, gift message, order total, claim status, and branch information
3. WHEN an invalid or non-existent claim code is submitted, THEN THE Order_System SHALL return an error message indicating the code was not found
4. WHEN a valid claim code is submitted, THE Order_System SHALL display gift order details in a user-friendly format
5. THE Order_System SHALL allow viewing of gift order details regardless of claim status

### Requirement 6: Gift Order Claiming

**User Story:** As a restaurant staff member, I want to mark gift orders as claimed when the recipient picks up their order, so that the system accurately tracks fulfillment.

#### Acceptance Criteria

1. THE Order_System SHALL provide an API endpoint to mark a gift order as claimed using the claim code
2. WHEN a gift order is marked as claimed, THE Order_System SHALL set giftClaimed to true and giftClaimedAt to the current timestamp
3. WHEN a gift order that is already claimed is marked as claimed again, THE Order_System SHALL return the existing claim timestamp without modification
4. WHEN an invalid claim code is submitted for claiming, THEN THE Order_System SHALL return an error message
5. WHEN a gift order is marked as claimed, THE Order_System SHALL update the order status according to normal order workflow

### Requirement 7: Admin Dashboard Gift Order Display

**User Story:** As a restaurant administrator, I want to see which orders are gifts and their claim status, so that I can track gift order fulfillment.

#### Acceptance Criteria

1. WHEN viewing the orders list in the Admin_Dashboard, THE Order_System SHALL visually distinguish gift orders from regular orders
2. WHEN viewing a gift order in the Admin_Dashboard, THE Order_System SHALL display gift-specific information including sender, recipient, claim code, claim status, and timestamps
3. THE Admin_Dashboard SHALL provide a filter to show only gift orders
4. THE Admin_Dashboard SHALL display whether each gift order is claimed or unclaimed
5. WHEN viewing an unclaimed gift order, THE Admin_Dashboard SHALL display how long the gift has been unclaimed

### Requirement 8: Gift Order Cancellation and Refund

**User Story:** As a restaurant administrator, I want to cancel and refund unclaimed gift orders, so that customers can receive refunds for gifts that were never picked up.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL allow cancellation of unclaimed gift orders
2. WHEN a gift order is unclaimed, THE Admin_Dashboard SHALL display a cancel option
3. WHEN a claimed gift order is selected for cancellation, THE Order_System SHALL prevent cancellation and display a warning message
4. WHEN an unclaimed gift order is cancelled, THE Order_System SHALL update the order status to CANCELLED and set cancelledAt timestamp
5. THE Order_System SHALL maintain gift order data including claim code after cancellation for record-keeping

### Requirement 9: Database Migration Safety

**User Story:** As a system administrator, I want database schema changes tested locally before production deployment, so that we avoid data loss or corruption issues.

#### Acceptance Criteria

1. THE Order_System SHALL provide database migration scripts that add gift order fields to the Order model
2. THE migration scripts SHALL add the following nullable fields: isGift (boolean), giftSenderName (string), giftSenderPhone (string), giftRecipientName (string), giftRecipientPhone (string), giftMessage (text), giftClaimCode (string), giftClaimed (boolean), giftClaimedAt (timestamp)
3. THE migration scripts SHALL set default values for existing orders: isGift defaults to false, all other gift fields default to null
4. THE migration scripts SHALL create a unique index on giftClaimCode for fast lookup
5. THE Local_Testing environment SHALL successfully run the migration scripts without errors before production deployment

### Requirement 10: Gift Order API Endpoints

**User Story:** As a developer, I want well-defined API endpoints for gift order operations, so that the frontend can interact with gift order functionality.

#### Acceptance Criteria

1. THE Order_System SHALL provide a POST endpoint at /api/orders/gift for creating gift orders
2. THE Order_System SHALL provide a GET endpoint at /api/orders/gift/[code] for retrieving gift order details by claim code
3. THE Order_System SHALL provide a PATCH endpoint at /api/orders/gift/[code]/claim for marking gift orders as claimed
4. WHEN the POST endpoint receives valid gift order data, THE Order_System SHALL return the created order with claim code and HTTP status 201
5. WHEN any endpoint receives invalid data or claim codes, THE Order_System SHALL return appropriate error messages with HTTP status 400 or 404

### Requirement 11: Gift Order UI Components

**User Story:** As a developer, I want reusable UI components for gift order functionality, so that the interface is consistent and maintainable.

#### Acceptance Criteria

1. THE Order_System SHALL provide a gift checkbox component for the checkout page
2. THE Order_System SHALL provide a gift details modal component that captures sender, recipient, and message information
3. THE Order_System SHALL provide a WhatsApp share button component that generates and opens the WhatsApp deep link
4. THE Order_System SHALL provide a gift order view component that displays gift details to recipients
5. THE Order_System SHALL provide admin dashboard components for displaying gift orders with claim status

### Requirement 12: Data Validation and Security

**User Story:** As a system administrator, I want gift order data validated and secured, so that the system prevents malicious input and protects user information.

#### Acceptance Criteria

1. WHEN gift order data is submitted, THE Order_System SHALL sanitize all text inputs to prevent injection attacks
2. WHEN phone numbers are submitted, THE Order_System SHALL validate they contain only digits and optional country code prefixes
3. WHEN gift messages are submitted, THE Order_System SHALL limit message length to 500 characters
4. THE Order_System SHALL validate that claim codes contain only alphanumeric characters when submitted via API
5. THE Order_System SHALL use HTTPS for all gift order API requests to protect data in transit

### Requirement 13: WhatsApp Message Formatting

**User Story:** As a recipient, I want the WhatsApp message formatted clearly, so that I can easily understand the gift details and claim instructions.

#### Acceptance Criteria

1. THE WhatsApp_Share message SHALL include a greeting with the recipient's name
2. THE WhatsApp_Share message SHALL list each ordered item with its quantity on a separate line
3. THE WhatsApp_Share message SHALL include the gift message in quotation marks if provided
4. THE WhatsApp_Share message SHALL display the claim code prominently with clear labeling
5. THE WhatsApp_Share message SHALL include the restaurant name, branch name, and address for pickup

### Requirement 14: Parser and Serializer for Gift Order Data

**User Story:** As a developer, I want to parse and serialize gift order data correctly, so that data integrity is maintained across storage and transmission.

#### Acceptance Criteria

1. THE Order_System SHALL provide a parser that converts incoming gift order JSON to internal gift order objects
2. THE Order_System SHALL provide a serializer that converts internal gift order objects to JSON for API responses
3. WHEN parsing gift order data, THE Order_System SHALL validate all required fields are present
4. WHEN serializing gift order data, THE Order_System SHALL include all gift-related fields and their current values
5. FOR ALL valid gift order objects, parsing the serialized JSON and then serializing the parsed object SHALL produce equivalent JSON output (round-trip property)

### Requirement 15: Gift Order Test Coverage

**User Story:** As a developer, I want comprehensive test coverage for gift order functionality, so that we catch bugs before production deployment.

#### Acceptance Criteria

1. THE Order_System SHALL include unit tests for claim code generation uniqueness
2. THE Order_System SHALL include unit tests for gift order data validation
3. THE Order_System SHALL include integration tests for the three gift order API endpoints
4. THE Order_System SHALL include tests verifying WhatsApp deep link generation
5. WHEN all tests are run, THE Order_System SHALL pass with no failures before deployment

