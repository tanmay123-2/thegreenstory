export default function Home() {
  return (
    <main style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f9fdf9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#2d6a4f', fontSize: '3rem' }}>The Green Story</h1>
        <p style={{ color: '#40916c', fontSize: '1.2rem' }}>Earth-friendly products for a better tomorrow.</p>
      </header>

      <section style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1b4332' }}>Featured Product</h2>
        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: '50px' }}>🌿</div>
          <h3>Bamboo Toothbrush</h3>
          <p style={{ color: '#52b788', fontWeight: 'bold', fontSize: '1.5rem' }}>₹199</p>
          <button style={{ backgroundColor: '#2d6a4f', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            Buy Now
          </button>
        </div>
      </section>

      <footer style={{ marginTop: '50px', color: '#777', fontSize: '0.8rem' }}>
        © 2026 The Green Story - Sustainably Crafted
      </footer>
    </main>
  );
}