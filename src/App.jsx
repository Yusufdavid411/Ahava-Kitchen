import { useMemo, useState } from "react";
import { menu } from "./data/menu";
import Footer from "./components/Footer";
import "./App.css";

const WHATSAPP_NUMBER = "2348035751374";

function getTodayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

function App() {
  const realToday = getTodayName();
  const isSunday = realToday === "Sunday";

  const [viewMonday, setViewMonday] = useState(false);
  const [mealType, setMealType] = useState("");
  const [riceOption, setRiceOption] = useState("");
  const [swallow, setSwallow] = useState("");
  const [soup, setSoup] = useState("");

  const displayDay = isSunday && viewMonday ? "Monday" : realToday;
  const todayMenu = menu[displayDay];

  const selectedOrder = useMemo(() => {
    if (!todayMenu) return "";

    if (mealType === "rice" && riceOption) {
      const selected = todayMenu.prices.find(
        (item) => item.type === riceOption
      );

      return `${todayMenu.rice} with ${selected.type} - ${selected.price}`;
    }

    if (mealType === "swallow" && swallow && soup) {
      return `${swallow} with ${soup} - ${todayMenu.swallowPrice}`;
    }

    return "";
  }, [mealType, riceOption, swallow, soup, todayMenu]);

  const canOrder = Boolean(selectedOrder) && !isSunday;

  function resetOrder() {
    setMealType("");
    setRiceOption("");
    setSwallow("");
    setSoup("");
  }

  function handleRiceClick() {
    setMealType("rice");
    setRiceOption("");
    setSwallow("");
    setSoup("");
  }

  function handleSwallowClick() {
    setMealType("swallow");
    setRiceOption("");
    setSwallow("");
    setSoup("");
  }

  function orderNow() {
    if (!canOrder) return;

    const message = `Hello Ahava Kitchen, I want to order: ${selectedOrder}. My location is: `;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main className="page">
      <header className="hero">
        <img src="/ahava-logo.jpg" alt="Ahava Kitchen Logo" className="logo" />

        <div>
          <h1>Ahava Kitchen</h1>
          <p>Sweet Taste Meets Excellence</p>
        </div>
      </header>

      <section className="menu-box">
        {isSunday && !viewMonday ? (
          <div className="closed-card">
            <span className="closed-tag">Closed Today</span>

            <h2>Service Is Not Available On Sundays</h2>

            <p>
              Ahava Kitchen does not sell on Sundays. Please come back tomorrow
              to place your order.
            </p>

            <button
              type="button"
              onClick={() => {
                setViewMonday(true);
                resetOrder();
              }}
            >
              View Monday Available Meals
            </button>
          </div>
        ) : (
          <>
            <div className="today-banner">
              <div>
                <span>
                  {isSunday ? "Tomorrow’s Available Menu" : "Today’s Available Menu"}
                </span>
                <strong>{displayDay}</strong>
              </div>

              <small>{isSunday ? "Ordering opens tomorrow" : "Open for orders"}</small>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Place Your Order</h2>
                <p>
                  Tap a meal card, complete your selection, then place your
                  order on WhatsApp.
                </p>
              </div>

              {isSunday && viewMonday && (
                <div className="notice">
                  You are viewing Monday’s menu. Orders will be available from
                  tomorrow.
                </div>
              )}

              <div className="order-section">
                <button
                  type="button"
                  className={`choice-card ${mealType === "rice" ? "selected" : ""}`}
                  onClick={handleRiceClick}
                >
                  <span className="choice-label">Step 1 — Rice Meal</span>
                  <strong>{todayMenu.rice}</strong>
                  <small>Click here, then choose your option below.</small>
                </button>

                {mealType === "rice" && (
                  <div className="sub-options">
                    <h3>Step 2 — Choose Beef or Chicken</h3>

                    <div className="grid">
                      {todayMenu.prices.map((item) => (
                        <button
                          type="button"
                          key={item.type}
                          onClick={() => setRiceOption(item.type)}
                          className={riceOption === item.type ? "selected" : ""}
                        >
                          {item.type} — {item.price}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="divider">OR</div>

              <div className="order-section">
                <button
                  type="button"
                  className={`choice-card ${
                    mealType === "swallow" ? "selected" : ""
                  }`}
                  onClick={handleSwallowClick}
                >
                  <span className="choice-label">Step 1 — Swallow Meal</span>
                  <strong>Swallow with Soup</strong>
                  <small>Click here, then choose swallow and soup below.</small>
                </button>

                {mealType === "swallow" && (
                  <div className="sub-options">
                    <h3>Step 2 — Choose Your Swallow</h3>

                    <div className="grid">
                      {todayMenu.swallows.map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setSwallow(item)}
                          className={swallow === item ? "selected" : ""}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <h3>Step 3 — Choose Your Soup</h3>

                    <div className="grid">
                      {todayMenu.soups.map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setSoup(item)}
                          className={soup === item ? "selected" : ""}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <p className="price-note">Swallow plate: {todayMenu.swallowPrice}</p>
                  </div>
                )}
              </div>

              <div className="summary">
                <span>Your selected order</span>
                <strong>
                  {selectedOrder || "No complete meal selected yet"}
                </strong>
              </div>

              <button
                type="button"
                className={`order-btn ${!canOrder ? "disabled" : ""}`}
                onClick={orderNow}
                disabled={!canOrder}
              >
                {isSunday ? "Ordering Opens Tomorrow" : "Order on WhatsApp"}
              </button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default App;