import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  tool: string;
}

const dialogBaseStyles = {
  content: "bg-neutral-900 border border-neutral-800 shadow-2xl",
  header: "mb-6",
  title: "text-2xl font-semibold text-white tracking-tight",
  description: "text-sm text-neutral-400 mt-2",
  label: "text-sm font-medium text-neutral-200",
  input: "bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:ring-reva-500 focus:border-reva-500",
  select: {
    trigger: "bg-neutral-800 border-neutral-700 text-white",
    content: "bg-neutral-900 border border-neutral-700",
    item: "text-neutral-200 data-[highlighted]:bg-neutral-800 data-[highlighted]:text-white"
  },
  switch: {
    root: "bg-neutral-700 data-[state=checked]:bg-reva-500",
    thumb: "bg-white"
  },
  button: "bg-reva-500 hover:bg-reva-600 text-white font-medium transition-colors"
};

export const SalesScriptDialog = ({ isOpen, onClose, onSubmit }: ToolDialogProps) => {
  const [formData, setFormData] = React.useState({
    property_type: "",
    target_audience: "",
    key_features: [],
    market_research: {
      trends: "",
      metrics: {},
      competition: ""
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={dialogBaseStyles.content}>
        <DialogHeader>
          <DialogTitle className={dialogBaseStyles.title}>Generate Sales Script</DialogTitle>
          <DialogDescription className={dialogBaseStyles.description}>
            Create a customized sales script based on property details and target audience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Property Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, property_type: value})}>
              <SelectTrigger className={dialogBaseStyles.select.trigger}>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className={dialogBaseStyles.select.content}>
                {["commercial", "residential", "industrial", "mixed-use", "land"].map((type) => (
                  <SelectItem key={type} value={type} className={dialogBaseStyles.select.item}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Target Audience</Label>
            <Select onValueChange={(value) => setFormData({...formData, target_audience: value})}>
              <SelectTrigger className={dialogBaseStyles.select.trigger}>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent className={dialogBaseStyles.select.content}>
                {["investor", "owner-occupant", "developer", "tenant"].map((type) => (
                  <SelectItem key={type} value={type} className={dialogBaseStyles.select.item}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Key Features (comma separated)</Label>
            <Input
              className={dialogBaseStyles.input}
              placeholder="Enter key features"
              onChange={(e) => setFormData({
                ...formData,
                key_features: e.target.value.split(',').map(f => f.trim())
              })}
            />
          </div>
          <Button
            onClick={() => onSubmit(formData)}
            className={dialogBaseStyles.button}
          >
            Generate Script
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ObjectionHandlerDialog = ({ isOpen, onClose, onSubmit }: ToolDialogProps) => {
  const [formData, setFormData] = React.useState({
    objection_type: "",
    property_context: {
      price: 0,
      location: "",
      property_type: "",
      market_data: {}
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={dialogBaseStyles.content}>
        <DialogHeader>
          <DialogTitle className={dialogBaseStyles.title}>Handle Objection</DialogTitle>
          <DialogDescription className={dialogBaseStyles.description}>
            Get expert responses to common sales objections.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Objection Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, objection_type: value})}>
              <SelectTrigger className={dialogBaseStyles.select.trigger}>
                <SelectValue placeholder="Select objection type" />
              </SelectTrigger>
              <SelectContent className={dialogBaseStyles.select.content}>
                {["price", "location", "condition", "timing", "competition"].map((type) => (
                  <SelectItem key={type} value={type} className={dialogBaseStyles.select.item}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Property Price</Label>
            <Input
              type="number"
              className={dialogBaseStyles.input}
              placeholder="Enter property price"
              onChange={(e) => setFormData({
                ...formData,
                property_context: {
                  ...formData.property_context,
                  price: parseFloat(e.target.value)
                }
              })}
            />
          </div>
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Location</Label>
            <Input
              className={dialogBaseStyles.input}
              placeholder="Enter location"
              onChange={(e) => setFormData({
                ...formData,
                property_context: {
                  ...formData.property_context,
                  location: e.target.value
                }
              })}
            />
          </div>
          <Button
            onClick={() => onSubmit(formData)}
            className={dialogBaseStyles.button}
          >
            Get Response
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ComparablesDialog = ({ isOpen, onClose, onSubmit }: ToolDialogProps) => {
  const [formData, setFormData] = React.useState({
    property_type: "",
    location: "",
    radius_miles: 5,
    price_range: {
      min: 0,
      max: 0
    },
    include_market_analysis: true
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={dialogBaseStyles.content}>
        <DialogHeader>
          <DialogTitle className={dialogBaseStyles.title}>Generate Comparables</DialogTitle>
          <DialogDescription className={dialogBaseStyles.description}>
            Find and analyze comparable properties in your target area.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Property Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, property_type: value})}>
              <SelectTrigger className={dialogBaseStyles.select.trigger}>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className={dialogBaseStyles.select.content}>
                {["commercial", "residential", "industrial", "mixed-use", "land"].map((type) => (
                  <SelectItem key={type} value={type} className={dialogBaseStyles.select.item}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Location</Label>
            <Input
              className={dialogBaseStyles.input}
              placeholder="Enter location (city, state)"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Search Radius (miles)</Label>
            <Input
              type="number"
              className={dialogBaseStyles.input}
              placeholder="Enter radius"
              onChange={(e) => setFormData({...formData, radius_miles: parseInt(e.target.value)})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className={dialogBaseStyles.label}>Min Price</Label>
              <Input
                type="number"
                className={dialogBaseStyles.input}
                placeholder="Min price"
                onChange={(e) => setFormData({
                  ...formData,
                  price_range: {
                    ...formData.price_range,
                    min: parseFloat(e.target.value)
                  }
                })}
              />
            </div>
            <div className="grid gap-2">
              <Label className={dialogBaseStyles.label}>Max Price</Label>
              <Input
                type="number"
                className={dialogBaseStyles.input}
                placeholder="Max price"
                onChange={(e) => setFormData({
                  ...formData,
                  price_range: {
                    ...formData.price_range,
                    max: parseFloat(e.target.value)
                  }
                })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Switch
              id="market-analysis"
              checked={formData.include_market_analysis}
              onCheckedChange={(checked) => setFormData({...formData, include_market_analysis: checked})}
              className={dialogBaseStyles.switch.root}
            />
            <Label htmlFor="market-analysis" className={dialogBaseStyles.label}>Include Market Analysis</Label>
          </div>
          <Button
            onClick={() => onSubmit(formData)}
            className={dialogBaseStyles.button}
          >
            Generate Comparables
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const LocationResearchDialog = ({ isOpen, onClose, onSubmit }: ToolDialogProps) => {
  const [formData, setFormData] = React.useState({
    location: "",
    property_type: "",
    metrics: []
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={dialogBaseStyles.content}>
        <DialogHeader>
          <DialogTitle className={dialogBaseStyles.title}>Research Location</DialogTitle>
          <DialogDescription className={dialogBaseStyles.description}>
            Analyze location metrics and market indicators.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Location</Label>
            <Input
              className={dialogBaseStyles.input}
              placeholder="Enter location (city, state)"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label className={dialogBaseStyles.label}>Property Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, property_type: value})}>
              <SelectTrigger className={dialogBaseStyles.select.trigger}>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className={dialogBaseStyles.select.content}>
                {["commercial", "residential", "industrial", "mixed-use", "land"].map((type) => (
                  <SelectItem key={type} value={type} className={dialogBaseStyles.select.item}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4">
            <Label className={dialogBaseStyles.label}>Metrics</Label>
            {["market_trends", "demographics", "infrastructure", "economic_indicators"].map((metric) => (
              <div key={metric} className="flex items-center space-x-3">
                <Switch
                  id={metric}
                  checked={formData.metrics.includes(metric)}
                  onCheckedChange={(checked) => {
                    const newMetrics = checked 
                      ? [...formData.metrics, metric]
                      : formData.metrics.filter(m => m !== metric);
                    setFormData({...formData, metrics: newMetrics});
                  }}
                  className={dialogBaseStyles.switch.root}
                />
                <Label htmlFor={metric} className={dialogBaseStyles.label}>
                  {metric.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Label>
              </div>
            ))}
          </div>
          <Button
            onClick={() => onSubmit(formData)}
            className={dialogBaseStyles.button}
          >
            Research Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 