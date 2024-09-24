
import Blog from '@/models/blog';
import Country from '@/models/country';
import City from '@/models/city';
import Property from '@/models/book';
import Service from '@/models/service';


import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const blogCount = await Blog.countDocuments();
    const countryCount = await Country.countDocuments();
    const cityCount = await City.countDocuments();
    const propertyCount = await Property.countDocuments();
    const serviceCount = await Property.countDocuments();


    res.status(200).json({
      blogs: blogCount,
      countries: countryCount,
      cities: cityCount,
      properties: propertyCount,
      services:serviceCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
}