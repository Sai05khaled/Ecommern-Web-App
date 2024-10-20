const router = require("express").Router();
const product = require("../models/product");
const user = require("../models/user");

//get products
router.get("/", async (req, res) => {
  try {
    const sort = { _id: -1 };
    const products = await product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// create products
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//update product

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await product.findByIdAndUpdate(id, {
      name,
      price,
      category,
      pictures,
      description,
    });
    const products = await product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete product

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const user = await UserActivation.findById(user_id);
    if (!user.isAdmin) return res.status(400).json("YOU DON'T HAVE PERMISSION");
    await product.findByIdAndDelete(id);
    const products = await product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// get by ID

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await product.findById(id);
    const similar = await product.find({ category: product.category }).limit(5);
    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//her get by category

router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    const sort = { _id: -1 };
    if (category == "all") {
      products = await Product.find().sort(sort);
    } else {
      products = await Product.find({ category }).sort(sort);
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// cart routes
router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, price } = req.body;

  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/increase-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/decrease-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/remove-from-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
