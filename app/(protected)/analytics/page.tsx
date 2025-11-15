"use client"

import { Card, CardContent } from '@/components/ui/card';
import { useGetProductsQuery } from '@/store/features/products/productApi';
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Analytics = () => {
    const {
        data: products = [],
        isLoading,
        isError,
        error,
    } = useGetProductsQuery();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 p-6 w-full">
            {/* Total Sold Bar Chart */}
            <Card className="shadow-lg rounded-2xl w-full overflow-x-auto">
                <CardContent className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-semibold mb-4 self-start">Total Sold by Product</h2>
                    <div className="w-full h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={products}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="totalSold" /></BarChart></ResponsiveContainer></div>
                </CardContent>
            </Card>

            {/* Views Line Chart */}
            <Card className="shadow-lg rounded-2xl w-full overflow-x-auto">
                <CardContent className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-semibold mb-4 self-start">Total Views Trend</h2>
                    <div className="w-full h-[300px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={products}><XAxis dataKey="name" /><YAxis /><Tooltip /><CartesianGrid strokeDasharray="3 3" /><Line type="monotone" dataKey="totalViews" /></LineChart></ResponsiveContainer></div>
                </CardContent>
            </Card>

            {/* Rating Pie Chart */}
            <Card className="shadow-lg rounded-2xl w-full overflow-x-auto">
                <CardContent className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-semibold mb-4 self-start">Rating Distribution</h2>
                    <div className="w-full h-[300px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={products} dataKey="ratingAvg" nameKey="name" cx="50%" cy="50%" outerRadius={100} label /><Tooltip /></PieChart></ResponsiveContainer></div>
                </CardContent>
            </Card>

            {/* Stock Bar Chart */}
            <Card className="shadow-lg rounded-2xl w-full overflow-x-auto">
                <CardContent className="flex flex-col items-center w-full">
                    <h2 className="text-xl font-semibold mb-4 self-start">Stock by Product</h2>
                    <div className="w-full h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={products}><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="stock" /></BarChart></ResponsiveContainer></div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Analytics