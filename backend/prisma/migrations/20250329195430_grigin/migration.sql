-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imges" (
    "id" SERIAL NOT NULL,
    "tour_id" INTEGER,
    "image_url" TEXT[],

    CONSTRAINT "img_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "tour_id" INTEGER,
    "room_type" TEXT,
    "room_details" TEXT[],
    "capacity" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" SERIAL NOT NULL,
    "season" VARCHAR(255),
    "title" VARCHAR(255),
    "sub_title" VARCHAR(255),
    "rating" INTEGER,
    "user_rating_total" DECIMAL(5,1),
    "duration_min" INTEGER,
    "duration_max" INTEGER,
    "food" VARCHAR(255),
    "price" DECIMAL(10,0),
    "advantages" TEXT,
    "amenities" TEXT[],
    "location_neighborhood" TEXT[],
    "location_communication" TEXT[],
    "distance_airport" TEXT[],
    "beaches" TEXT[],
    "about_hotel" TEXT[],
    "sports_entertainment" TEXT[],
    "pool" TEXT[],
    "spa" TEXT[],
    "services" TEXT[],
    "contacts" TEXT[],
    "for_children" TEXT[],
    "food_info" TEXT[],
    "bed_and_breakfast" TEXT[],
    "all_inclusive" TEXT[],
    "rating_purity" DECIMAL(3,1),
    "rating_infrastructure" DECIMAL(3,1),
    "rating_location" DECIMAL(3,1),
    "rating_convenience_rooms" DECIMAL(3,1),
    "rating_wifi" DECIMAL(3,1),
    "rating_pool" DECIMAL(3,1),
    "rating_availability_transport" DECIMAL(3,1),
    "rating_room_service" DECIMAL(3,1),
    "rating_childrens_zone" DECIMAL(3,1),
    "rating_entertainment_excursions" DECIMAL(3,1),

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- AddForeignKey
ALTER TABLE "imges" ADD CONSTRAINT "img_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
