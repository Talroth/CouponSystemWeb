package com.CouponSystem.Service;

import java.time.LocalDateTime;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.CouponSystem.Beans.Company;
import com.CouponSystem.Beans.Coupon;
import com.CouponSystem.Beans.CouponType;
import com.CouponSystem.CouponSystem.CouponSystem;
import com.CouponSystem.Facade.CompanyFacade;
import com.CouponSystem.FacadeException.FacadeException;

import DAOException.DAOExceptionErrorType;

@Path("/companyService")
public class CompanyService {

	@Context
	private HttpServletRequest request;
	//private HttpServletResponse response;
	private CouponSystem mainSystem = CouponSystem.getInstance();
	private static final String FACADE_ATTRIBUTE  = "facadeAtt";

	@POST
	@Path("/createCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String createCoupon(Coupon coupon)  {
		try 
		{			
			getFacade().createCoupon(coupon);
			return "ok";
		} 
		catch (FacadeException e) 
		{
			return e.getMessage();
		}
	}


	@DELETE
	@Path("/removeCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String removeCoupon(Coupon coupon)  {

		try
		{
			getFacade().removeCoupon(coupon);
			return "ok";
		} 
		catch (FacadeException e) 
		{
			return e.getMessage();
		}
	}


	@PUT
	@Path("/updateCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updateCoupon(Coupon coupon)  {

		try 
		{
			getFacade().updateCoupon(coupon);
			return "ok";
		} 
		catch (FacadeException e) 
		{
			return e.getMessage();
		}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCoupon/{id}")
	public Coupon getCoupon(@PathParam("id") long id)  {

		try 
		{
			return getFacade().getCoupon(id);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getAllCoupons")
	public Collection<Coupon> getAllCoupons() throws FacadeException {

		try 
		{
			return getFacade().getAllCoupons();
		} 
		catch (FacadeException e) 
		{
			throw e;
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCouponByType/{couponType}")
	public Collection<Coupon> getCouponByType(@PathParam("couponType") CouponType couponType)  {

		try 
		{
			return getFacade().getCouponByType(couponType);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCouponByPrice/{minPrice},{maxPrice}")
	public Collection<Coupon> getCouponByPrice(@PathParam("minPrice") double minPrice, @PathParam("maxPrice") double maxPrice)  {

		try 
		{
			return getFacade().getCouponByPrice(minPrice, maxPrice);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCouponByEndDate/{endDate}")
	public Collection<Coupon> getCouponByEndDate(@PathParam("endDate") String endDate)  {
		try 
		{
			LocalDateTime endDateFormat =  LocalDateTime.parse(endDate);
			
			return getFacade().getCouponByEndDate(endDateFormat);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCompanyDetails")
	public Company getCompanyDetails()  {

		try 
		{
			return getFacade().getCompanyDetails();
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}


	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/login")
	public String login(@DefaultValue("none") @QueryParam("user") String name, @DefaultValue("none") @QueryParam("password") String password)  {
		try 
		{
			CompanyFacade companyFacade = (CompanyFacade) mainSystem.login(name,  password, "company");
			if (companyFacade != null)
			{
				HttpSession session = request.getSession();
				//TODO: check if new ?
				session.setAttribute(FACADE_ATTRIBUTE, companyFacade);
				return "ok";		
			}
			return "fail";	
		} 
		catch (FacadeException e)
		{
			return e.getMessage();	
		}
	}
	
	@POST
	@Path("/logout")
	public String logout()
	{
		//TODO: in case of failure add catch
		HttpSession session = request.getSession();
		session.invalidate();
		return "ok";
	}
	
	private CompanyFacade getFacade() throws FacadeException
	{
		HttpSession session = request.getSession(false);
		
		if (session !=null)
		{
			return ((CompanyFacade) session.getAttribute(FACADE_ATTRIBUTE));
		}
		else
		{
			throw new FacadeException(DAOExceptionErrorType.ADMIN_FAIL_LOGIN,"User is not connected");
		}
	}

}
