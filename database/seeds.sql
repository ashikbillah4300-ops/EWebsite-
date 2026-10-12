-- ============================================
-- AWBIN ISLAMIC E-COMMERCE SAMPLE DATA
-- ============================================

CREATE DATABASE IF NOT EXISTS awbin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE awbin;

-- ============================================
-- APPROVED ISLAMIC PRODUCT CATEGORIES
-- ============================================

-- 1. Panjabi & Men's Islamic Clothing
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Panjabi & Men\'s Wear', 'পাঞ্জাবি ও পুরুষদের ইসলামিক পোশাক', 'panjabi', 'প্রিমিয়াম সুতি, কাবলি, সাদা নামাজি পাঞ্জাবি ও জুব্বা', 'shirt', TRUE, TRUE, 1);
SET @panjabi_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Premium Panjabi', 'প্রিমিয়াম পাঞ্জাবি', 'premium-panjabi', 'কম্বড সুতির কাবলি পাঞ্জাবি', @panjabi_id, TRUE, TRUE, 1),
('Traditional Panjabi', 'ঐতিহ্যবাহী পাঞ্জাবি', 'traditional-panjabi', 'সিল্ক-কটন পাঞ্জাবি', @panjabi_id, TRUE, TRUE, 2),
('White Panjabi', 'সাদা পাঞ্জাবি', 'white-panjabi', 'ধবধবে সাদা নামাজি পাঞ্জাবি', @panjabi_id, TRUE, TRUE, 3),
('Islamic Jubba', 'ইসলামিক জুব্বা', 'islamic-jubba', 'সৌদি ও আমিরাতি জুব্বা', @panjabi_id, TRUE, TRUE, 4);

-- 2. Attar & Fragrance
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Attar & Fragrance', 'আতর ও সুগন্ধি', 'attar', '১০০% অ্যালকোহলমুক্ত দেহন আল উদ ও কস্তুরী মাস্ক', 'sparkles', TRUE, TRUE, 2);
SET @attar_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Alcohol-Free Attar', 'অ্যালকোহলমুক্ত আতর', 'alcohol-free-attar', 'খাঁটি পারফিউম অয়েল', @attar_id, TRUE, TRUE, 1),
('Oud and Musk', 'উদ ও মাস্ক', 'oud-and-musk', 'কম্বোডিয়ান উদ ও মাস্ক তাহারা', @attar_id, TRUE, TRUE, 2),
('Arabian Fragrances', 'অ্যারাবিয়ান সুগন্ধি', 'arabian-fragrances', 'সুলতান আল আরব ও মদিনা রোজ', @attar_id, TRUE, TRUE, 3);

-- 3. Topi & Caps
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Topi & Caps', 'টুপি ও ইসলামিক এক্সেসরিজ', 'topi', 'তুর্কি, ওমানি ও সাদা নামাজি টুপি', 'crown', TRUE, TRUE, 3);
SET @topi_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Men\'s Prayer Caps', 'নামাজের টুপি', 'prayer-caps', 'সাদা সুতি নামাজি টুপি', @topi_id, TRUE, TRUE, 1),
('Turkish Caps', 'তুর্কি টুপি', 'turkish-caps', 'তুর্কি ভেলভেট সূচিকর্ম টুপি', @topi_id, TRUE, TRUE, 2);

-- 4. Prayer Mats
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Prayer Mats', 'জায়নামাজ ও নামাজের সামগ্রী', 'prayer-mats', 'তুর্কি ভেলভেট ও অর্থোপেডিক জায়নামাজ', 'bookmark', TRUE, TRUE, 4);
SET @mats_id = LAST_INSERT_ID();

INSERT INTO categories (name_en, name_bn, slug, description, parent_id, is_featured, is_active, order_by) VALUES 
('Premium Prayer Mats', 'প্রিমিয়াম জায়নামাজ', 'premium-prayer-mats', 'তুর্কি ভেলভেট জায়নামাজ', @mats_id, TRUE, TRUE, 1),
('Travel Prayer Mats', 'ট্রাভেল জায়নামাজ', 'travel-prayer-mats', 'ওয়াটারপ্রুফ পকেট জায়নামাজ', @mats_id, TRUE, TRUE, 2);

-- 5. Tasbih & Dhikr
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Tasbih & Dhikr', 'তসবিহ ও জিকিরের সামগ্রী', 'tasbih', 'জলপাই কাঠ ও ডিজিটাল এলইডি তসবিহ', 'circle', TRUE, TRUE, 5);

-- 6. Quran & Books
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Quran & Books', 'কুরআন ও ইসলামিক বই', 'quran-and-books', 'তাজবীদসহ কুরআনুল কারীম ও হাদিস গ্রন্থ', 'book', TRUE, TRUE, 6);

-- 7. Hijab & Modest Wear
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Hijab & Modest Wear', 'হিজাব ও পর্দার পোশাক', 'hijab-and-abaya', 'দুবাই নিদাহ আবায়া ও তুর্কি হিজাব', 'heart', TRUE, TRUE, 7);

-- 8. Islamic Gifts
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Islamic Gifts', 'ইসলামিক গিফট ও গিফট বক্স', 'islamic-gifts', 'জায়নামাজ, আতর ও তসবিহ সমৃদ্ধ গিফট সেট', 'gift', TRUE, TRUE, 8);

-- 9. Ramadan & Eid
INSERT INTO categories (name_en, name_bn, slug, description, icon, is_featured, is_active, order_by) VALUES 
('Ramadan & Eid', 'রমজান ও ঈদের সামগ্রী', 'ramadan-and-eid', 'মদিনার আজওয়া খেজুর ও লণ্ঠন', 'moon', TRUE, TRUE, 9);
