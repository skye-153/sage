import { NextRequest, NextResponse } from 'next/server';
import { loadData, saveData } from '@/lib/server-data';

export async function GET() {
  try {
    const data = loadData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json();
    saveData(newData);
    return NextResponse.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
