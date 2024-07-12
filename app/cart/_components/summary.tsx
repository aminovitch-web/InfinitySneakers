import Currency from "@/components/currency";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Summary = ({ cartItems }: any) => {
  const onCheckout = async () => {};

  return (
    <div className="bg-white dark:bg-black border rounded-lg p-6 grid gap-4 h-60">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Order Summary</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span>
            <Currency value={cartItems.totalAmount} />
          </span>
        </div>
      </div>
      <Button
        size="lg"
        className="w-full"
        variant="infinitySneakers"
        disabled={cartItems.items.length < 1}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
